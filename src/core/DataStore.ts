import * as sqlite3 from 'sqlite3';

export interface CompanyInterface {
  name: string;
  address: string;
  rut: number;
  mtssNumber: number;
  cgroup: number;
  subgroup: number;
}

export interface EmployeeInterface {
  ci: number;
  name: string;
  companyName: string;
  position: string;
  entryDate: string;
  bpsAfiliationNumber: number;
  nominalSalary: number;
  fonasa: string;
}

export default class DataStore {
  private static instance: DataStore;

  public selectedCompany: string = '';

  private dataBase;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.dataBase = new sqlite3.Database('db.sql');

    console.log('Ping');

    this.dataBase.serialize(() => {
      try {
        this.dataBase.run(
          'CREATE TABLE IF NOT EXISTS company (name TEXT, rut INTEGER, address TEXT, mtssNumber INTEGER, cgroup INTEGER, subgroup INTEGER)'
        );

        this.dataBase.run(
          'CREATE TABLE IF NOT EXISTS employee (ci TEXT, name TEXT, companyName TEXT, position TEXT, entryDate TEXT, bpsAfiliationNumber INTEGER, nominalSalary INTEGER, fonasa TEXT)'
        );
      } catch (error) {
        console.log(error);
      }
    });

    console.log('Pong');
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  async fetchEmployees(companyName?: string): Promise<EmployeeInterface[]> {
    return new Promise((resolve, reject) => {
      this.dataBase.all(
        companyName
          ? `SELECT * FROM employee WHERE companyName = "${companyName}"`
          : 'SELECT * FROM employee',
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  }

  async fetchCompanies(): Promise<CompanyInterface[]> {
    return new Promise((resolve, reject) => {
      this.dataBase.all('SELECT * FROM company', (err: any, rows: any) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });
  }

  async fetchCompaniesNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.dataBase.all('SELECT name FROM company', (err: any, rows: any) => {
        if (err) {
          reject(err);
        }

        resolve(rows.map((row: any) => row.name));
      });
    });
  }

  async getCompany(name: string): Promise<CompanyInterface> {
    return new Promise<CompanyInterface>((resolve, reject) => {
      this.dataBase.get(
        `SELECT * FROM company WHERE name = "${name}"`,
        (err: any, row: any) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        }
      );
    });
  }

  async addCompany(props: CompanyInterface) {
    const { name, rut, address, mtssNumber, cgroup, subgroup } = props;
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `INSERT INTO company (name, rut, address, mtssNumber, cgroup, subgroup) VALUES ("${name}", ${rut}, "${address}", ${mtssNumber}, ${cgroup}, ${subgroup})`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  async addEmployee(
    ci: number,
    name: string,
    companyName: string,
    position: string,
    entryDate: string,
    bpsAfiliationNumber: number,
    nominalSalary: number,
    fonasa: string
  ) {
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `INSERT INTO employee (ci, name, companyName, position, entryDate, bpsAfiliationNumber, nominalSalary, fonasa) VALUES (${ci}, "${name}", "${companyName}", "${position}", "${entryDate}", ${bpsAfiliationNumber}, ${nominalSalary}, "${fonasa}")`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  async updateEmployee(
    ci: number,
    name: string,
    companyName: string,
    position: string,
    entryDate: string,
    bpsAfiliationNumber: number,
    nominalSalary: number,
    fonasa: string
  ) {
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `UPDATE employee SET position = "${position}", entryDate = "${entryDate}", bpsAfiliationNumber = ${bpsAfiliationNumber}, nominalSalary = ${nominalSalary}, fonasa = "${fonasa}" WHERE ci = ${ci} AND companyName = "${companyName}"`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  async updateCompany(
    name: string,
    rut: number,
    address: string,
    mtssNumber: number,
    group: number,
    subgroup: number
  ) {
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `UPDATE company SET rut = ${rut}, address="${address}", mtssNumber = ${mtssNumber}, cgroup = ${group}, subgroup = ${subgroup} WHERE name = "${name}"`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  async deleteEmployee(ci: string, companyName: string) {
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `DELETE FROM employee WHERE ci = ${ci} AND companyName = "${companyName}"`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  async deleteCompany(name: string) {
    return new Promise<void>((resolve, reject) => {
      this.dataBase.run(
        `DELETE FROM company WHERE name = "${name}"`,
        (err: any) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }
}
