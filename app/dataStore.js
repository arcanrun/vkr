//@flow

import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

class DataStore {
  constructor(dbName: string) {
    this.adapter = new FileSync(`${dbName}.json`);
    this.db = low(this.adapter);
  }
  create(data: any) {
    this.db.defaults(data).write();
  }
  addValue() {}
  getAll() {
    return this.db.getState();
    // this.db.get(data).value();
  }
  getValue() {}
  deleteValue() {}
  update() {}
}

export default DataStore;
