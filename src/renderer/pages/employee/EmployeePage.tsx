/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Suspense, useEffect, useState } from 'react';

import { Button, Spin, Table } from 'antd';
import Layout from 'antd/lib/layout/layout';
import DataStore, { EmployeeInterface } from 'core/DataStore';
import { Link } from 'react-router-dom';

export interface EmployeePageProps {}

export default function EmployeePage(props: EmployeePageProps) {
  const dataStore = DataStore.getInstance();

  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const employeesToSet = await dataStore.fetchEmployees();
      console.log(employeesToSet);

      setEmployees(employeesToSet);
    };

    fetchData();
  }, []);

  const columns = {};

  /**
   *ci: number;
   *name: string;
   *companyName: string;
   *position: string;
   *entryDate: string;
   *bpsAfiliationNumber: number;
   *nominalSalary: number;
   *fonasa: string;
   */

  return (
    <Layout className="site-layout">
      <Suspense fallback={<Spin size="large" />}>
        <Table dataSource={employees}>
          <Table.Column title="CI" dataIndex="ci" key="ci" />
          <Table.Column title="Nombre" dataIndex="name" key="name" />
          <Table.Column
            title="Empresa"
            dataIndex="companyName"
            key="companyName"
          />
          <Table.Column title="Cargo" dataIndex="position" key="position" />
          <Table.Column
            title="Fecha de Ingreso"
            dataIndex="entryDate"
            key="entryDate"
          />
          <Table.Column
            title="Número de Afiliación BPS"
            dataIndex="bpsAfiliationNumber"
            key="bpsAfiliationNumber"
          />
          <Table.Column
            title="Salario Nominal"
            dataIndex="nominalSalary"
            key="nominalSalary"
          />
          <Table.Column title="FONASA" dataIndex="fonasa" key="fonasa" />
        </Table>
        <Button>
          <Link to="/employee">➕</Link>
        </Button>
      </Suspense>
    </Layout>
  );
}
