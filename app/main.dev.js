/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import $ from 'cheerio';
import shortid from 'shortid';
import MenuBuilder from './menu';

// rp('file:///Users/admin/Documents/Electron/vkr/app/test.html')
//   .then(function(htmlString) {
//     console.log(htmlString);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// osmosis
//   .get('file:///Users/admin/Documents/Electron/vkr/app/test.html')
//   .find('div')
//   .log(console.log);

// import DataStore from './dataStore';

// const db = new DataStore('db');
// db.create({ sources: [] });

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const adapter2 = new FileSync('db2.json');
const db = low(adapter);
const db2 = low(adapter2);
db.defaults({ sources: [] }).write();
db2.defaults({ sources: [] }).write();

const checkIsInDB = url => {
  const allUrls = db2
    .get('sources')
    .map('url')
    .value();

  if (allUrls.includes(url)) {
    return true;
  }
  return false;
};

const checkIsInDBById = (id: string) => {
  const allIds = db2
    .get('sources')
    .map('id')
    .value();
  if (allIds.includes(id)) {
    return true;
  }
  return false;
};

if (!checkIsInDBById('0')) {
  const allAnalyze = {
    id: '0',
    title: 'Все источники',
    analyze: []
  };
  db2
    .get('sources')
    .push(allAnalyze)
    .write();
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1240,
    height: 760
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

ipcMain.on('request_all_sources', (event, arg) => {
  // const allData = db.getState();
  const allData = db2.getState();

  try {
    event.sender.send('recive_all_sources', allData);
  } catch (err) {
    event.sender.send('recive_all_sources_error', err.message);
  }
});

ipcMain.on('change_some', (event, msg) => {
  db.get('sources[0].analyze.usa.airforce')
    .push({
      name: 'Moscow',
      value: msg
    })
    .write();
});

ipcMain.on('add_to_bd', (event, msg) => {
  const url = msg;
  if (checkIsInDB(url)) {
    return;
  }

  const id = shortid.generate();
  fs.readFile(msg, 'utf8', (err, data) => {
    if (err) throw err;
    const title = $('title', data).text();
    const descr = $('meta[name=description]', data).attr('content');
    const icon = '...';
    const trackingDate = Date.now();
    const toDb = {
      id,
      url,
      title,
      descr,
      icon,
      trackingDate,
      news: []
    };
    db2
      .get('sources')
      .push(toDb)
      .write();
    console.log(toDb);
    // event.sender.send('res_db', descr);
  });
});

ipcMain.on('remove_source', (event, msg) => {
  try {
    db2
      .get('sources')
      .remove({ id: msg })
      .write();
    event.sender.send('remove_source_response', true);
  } catch (err) {
    event.sender.send('remove_source_response', false);
  }
});

const parseNews = (url: string) => {
  let res = [];
  let newsCleaned = [];
  let dateCleaned = [];
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) console.log('SOME ERROE WHILE READING FILE!');

    const news = $('.news__item_body', data).toArray();
    news.forEach(el => {
      newsCleaned.push(el.children[0].data.trim());
    });
    const date = $('.news__item_date', data).toArray();
    date.forEach(el => {
      dateCleaned.push(el.children[0].data.trim());
    });

    newsCleaned.forEach((el, i) => {
      res.push({
        date: dateCleaned[i],
        text: newsCleaned[i],
        analyze: []
      });
    });
    addNewsToDb(res, url);
  });
};
parseNews('/Users/admin/Desktop/testHtml/index.html');

const addNewsToDb = (news, url) => {
  db2
    .get('sources')
    .find({ url })
    .assign({ news })
    .write();
};

ipcMain.on('start_parsing', (event, msg) => {
  const arrUrls = db2
    .get('sources')
    .map('url')
    .value();
  const cleanedUrls = [];

  arrUrls.forEach(el => {
    if (el) {
      cleanedUrls.push(el);
    }
  });

  cleanedUrls.forEach(url => {
    parseNews(url);
  });
});
