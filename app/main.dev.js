/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
import { netAnalyze, processNetAnalyzeMaxData } from './neuralNetWork';

// console.log(
//   '------>',
//   formObjectForDb(
//     processNetAnalyzeMaxData(
//       netAnalyze('The US goverment sent his airplanes to the Afganistan'),
//       0.3
//     )
//   )
// );

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
    height: 760,
    frame: false
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

function formObjectForDb(analyze) {
  const res = {
    who: [],
    what_and_where: {
      airforce: [],
      marine: [],
      infantry: []
    }
  };
  const what = ['airforce', 'marine', 'infantry'];
  for (const key in analyze) {
    if (!key.includes('to_') && !what.includes(key)) {
      res.who.push(key);
    }
    if (what.includes(key)) {
      if (key === 'airforce') {
        for (const key2 in analyze) {
          if (key2.includes('to_'))
            res.what_and_where.airforce.push(key2.substr(3));
        }
      }
      if (key === 'marine') {
        for (const key2 in analyze) {
          if (key2.includes('to_'))
            res.what_and_where.marine.push(key2.substr(3));
        }
      }
      if (key === 'infantry') {
        for (const key2 in analyze) {
          if (key2.includes('to_'))
            res.what_and_where.infantry.push(key2.substr(3));
        }
      }
    }
  }
  return res;
}

function armyTypeAnalyze(
  army = [],
  armyName = 'EMPTY',
  countryInFullAnalyze = {}
) {
  army.forEach(country => {
    const countryNameArr = countryInFullAnalyze[armyName].map(el => {
      return el.name;
    });
    if (countryNameArr.includes(country)) {
      countryInFullAnalyze[armyName].forEach((el, i) => {
        if (el.name === country) {
          countryInFullAnalyze[armyName][i].value += 1;
        }
      });
    } else {
      countryInFullAnalyze[armyName].push({
        name: country,
        value: 1
      });
    }
  });
}
function analyzeDbItem(fullAnalyze = {}, news = [{}]) {
  const countryName = news.analyze.who[0];
  const countryInFullAnalyze = fullAnalyze.analyze[countryName];
  const { airforce } = news.analyze.what_and_where;
  const { marine } = news.analyze.what_and_where;
  const { infantry } = news.analyze.what_and_where;
  if (countryName) {
    if (countryName in fullAnalyze.analyze) {
      countryInFullAnalyze.dateRange.push(Date.parse(news.date));
      countryInFullAnalyze.dateRange.sort();
      countryInFullAnalyze.dateRange = [
        countryInFullAnalyze.dateRange[0],
        countryInFullAnalyze.dateRange[
          countryInFullAnalyze.dateRange.length - 1
        ]
      ];

      armyTypeAnalyze(airforce, 'airforce', countryInFullAnalyze);
      armyTypeAnalyze(marine, 'marine', countryInFullAnalyze);
      armyTypeAnalyze(infantry, 'infantry', countryInFullAnalyze);

      countryInFullAnalyze.number_of_mentions += 1;
    } else {
      fullAnalyze.analyze[countryName] = {
        dateRange: [Date.parse(news.date)],
        number_of_mentions: 1,
        airforce: [],
        marine: [],
        infantry: []
      };

      // eslint-disable-next-line no-shadow
      const countryInFullAnalyze = fullAnalyze.analyze[countryName];

      armyTypeAnalyze(airforce, 'airforce', countryInFullAnalyze);
      armyTypeAnalyze(marine, 'marine', countryInFullAnalyze);
      armyTypeAnalyze(infantry, 'infantry', countryInFullAnalyze);
    }
  }
  return fullAnalyze.analyze;
}

function analyzeDb(fullAnalyze) {
  const allData = db2.getState().sources;

  allData.forEach(el => {
    if (el.id !== '0') {
      el.news.forEach(news => {
        analyzeDbItem(fullAnalyze, news);
      });
    }
  });
  return fullAnalyze.analyze;
}

function makeFullAnalyze() {
  const fullAnalyze = {
    analyze: {}
  };
  return analyzeDb(fullAnalyze);
}

// const makeAnalyze = (url: string, sens: number) => {
//   const allData = db2.getState().sources;
//   allData.forEach((el, i) => {
//     if (el.url === url) {
//       const { news } = el;
//       news.forEach((news, j) => {
//         if (news.analyze === '') {
//           const neuralAnalyze = formObjectForDb(
//             processNetAnalyzeMaxData(netAnalyze(news.text), sens)
//           );
//           console.log(neuralAnalyze);
//           db2
//             .get(`sources[${i}].news[${j}]`)
//             .assign({ analyze: neuralAnalyze })
//             .write();
//         }
//       });
//     }
//   });
// };
// makeAnalyze('/Users/admin/Desktop/testHtml/morenews.html', 0.3);

const addNewsToDb = (news, url) => {
  db2
    .get('sources')
    .find({ url })
    .assign({ news })
    .write();
};

function parseNewsAsync(url: string, sens: number = 0.3) {
  const res = [];
  const newsCleaned = [];
  const dateCleaned = [];
  fs.readFile(url, 'utf8', (err, data) => {
    console.log('START PARSING');

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
        analyze: formObjectForDb(
          processNetAnalyzeMaxData(netAnalyze(newsCleaned[i]), sens)
        )
      });
    });
    addNewsToDb(res, url);
  });
}

function parseNewsSync(url: string, sens: Object) {
  const { sensWho, sensWhere, sensAirforce, sensMarine, sensInfantry } = sens;
  const res = [];
  const newsCleaned = [];
  const dateCleaned = [];
  const data = fs.readFileSync(url, 'utf8');

  console.log('START PARSING');

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
      analyze: formObjectForDb(
        processNetAnalyzeMaxData(
          netAnalyze(newsCleaned[i]),
          sensWho,
          sensWhere,
          sensAirforce,
          sensMarine,
          sensInfantry
        )
      )
    });
  });
  addNewsToDb(res, url);
}
const demoAllData = db.getState();
function getAll(showDemo = false) {
  const res = { sources: [] };
  const fullAnalyze = db2.get('sources[0]').value();
  res.sources.push(fullAnalyze);
  const allData = db2.getState().sources;
  allData.forEach(el => {
    if (el.id !== '0') {
      const tempRes = {};
      tempRes.id = el.id;
      tempRes.title = el.title;
      tempRes.url = el.url;
      tempRes.icon = el.icon;
      tempRes.descr = el.descr;
      tempRes.trackingDate = el.trackingDate;
      tempRes.analyze = {};

      el.news.forEach(news => {
        analyzeDbItem(tempRes, news);
      });
      res.sources.push(tempRes);
    }
  });
  if (showDemo) {
    return {
      sources: [...res.sources, ...demoAllData.sources]
    };
  }
  return res;
}

function notifyFrontEnd(to, isAlert, message) {
  to.sender.send('ipc_main_info', [isAlert, message]);
}

// eslint-disable-next-line no-unused-vars
ipcMain.on('request_all_sources', (event, msg) => {
  const allData = getAll(msg);

  try {
    event.sender.send('recive_all_sources', allData);
  } catch (err) {
    event.sender.send('recive_all_sources_error', err.message);
  }
});

ipcMain.on('add_to_bd', (event, msg) => {
  const { url, showDemo } = msg;
  console.log('------>', url);
  const alert = true;
  if (checkIsInDB(url)) {
    notifyFrontEnd(event, alert, `${url} Уже длбавлен в базу данных`);
    return;
  }

  const id = shortid.generate();
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) throw err;
    const title = $('title', data).text();
    const descr = $('meta[name=description]', data).attr('content');
    let icon = {};
    if (!(typeof icon === 'string')) {
      icon = undefined;
    }
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

    const allData = getAll(showDemo);
    event.sender.send('recive_all_sources', allData);
  });
});

ipcMain.on('remove_source', (event, msg) => {
  const { id, showDemo } = msg;
  try {
    db2
      .get('sources')
      .remove({ id })
      .write();

    db2
      .get('sources')
      .find({ id: '0' })
      .assign({ analyze: makeFullAnalyze() })
      .write();

    const allData = getAll(showDemo);

    event.sender.send('remove_source_response', true);
    event.sender.send('recive_all_sources', allData);
  } catch (err) {
    event.sender.send('remove_source_response', false);
  }
});

// eslint-disable-next-line no-unused-vars
ipcMain.on('start_parsing', (event, msg) => {
  const { sensevity, showDemo } = msg;

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
    parseNewsSync(url, sensevity);
  });

  db2
    .get('sources')
    .find({ id: '0' })
    .assign({ analyze: makeFullAnalyze() })
    .write();
  const allData = getAll(showDemo);
  event.sender.send('recive_all_sources', allData);
});
