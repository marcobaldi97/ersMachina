const sqlite3 = require('sqlite3').verbose();

export default class DataStore {
  private static instance: DataStore;

  private dataBase;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.dataBase = new sqlite3.Database(':memory:');

    this.dataBase.serialize(() => {
      this.dataBase.run(
        'CREATE TABLE IF NOT EXISTS company (name TEXT, rut TEXT)'
      );

      this.dataBase.run(
        'CREATE TABLE IF NOT EXISTS employee (ci TEXT, name TEXT, companyName TEXT)'
      );

      this.dataBase.run(
        'INSERT INTO company (name, rut) VALUES (?, ?)',
        ['Company 1', '123456789'],
        (err:any) => {
          if (err) {
            console.error(err);
          }
        }
      );

      this.dataBase.run(
        'INSERT INTO employee (ci, name, companyName) VALUES (?, ?, ?)',
        ['123456789', 'Employee 1', 'Company 1'],
        (err:any) => {
          if (err) {
            console.error(err);
          }
        }
      );
    });
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  async fetchEmployees(companyName: string) {
    return new Promise((resolve, reject) => {
      this.dataBase.all(
        `SELECT * FROM employee WHERE companyName = '${companyName}'`,
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  }

  async fetchCompanies(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.dataBase.all('SELECT * FROM company', (err: any, rows: any) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });
  }
}
