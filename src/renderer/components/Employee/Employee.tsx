/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Suspense, useEffect, useState } from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import locale from 'antd/lib/date-picker/locale/es_ES';
import DataStore, { EmployeeInterface } from 'core/DataStore';
import { Redirect, useParams } from 'react-router-dom';

import './Employee.styles.scss';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Employee(props: any) {
  const dataStore = DataStore.getInstance();

  // eslint-disable-next-line react/destructuring-assignment
  const { paramCompanyName, paramCi } =
    useParams<{ paramCompanyName: string; paramCi: string }>();

  const [companyName, setCompanyName] = useState(paramCompanyName ?? '');
  const [ci, setCi] = useState(Number.parseInt(paramCi, 10) ?? 0);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [entryDate, setEntryDate] = useState(''); // the date is in the formar dd/mm/yyyy
  const [bpsAfiliationNumber, setBpsAfiliationNumber] = useState(0);
  const [nominalSalary, setNominalSalary] = useState(0);
  const [fonasa, setFonasa] = useState('');
  const [companiesNames, setCompaniesNames] = useState<string[]>([]);
  const [redirect, setRedirect] = useState(false);

  const [employeeData, setEmployeeData] = useState<EmployeeInterface>();

  useEffect(() => {
    if (paramCi) {
      const fetchData = async () => {
        const fetchedEmployeeData: EmployeeInterface =
          await dataStore.fetchEmployee(paramCi);

        setEmployeeData(fetchedEmployeeData);
      };

      fetchData();
    } else {
      const fetchData = async () => {
        const companies = await dataStore.fetchCompaniesNames();
        setCompaniesNames(companies);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Hi!');

    if (employeeData) {
      console.log('Mark');

      setName(employeeData.name);
      setPosition(employeeData.position);
      setEntryDate(employeeData.entryDate);
      setBpsAfiliationNumber(employeeData.bpsAfiliationNumber);
      setNominalSalary(employeeData.nominalSalary);
      setFonasa(employeeData.fonasa);
    }
  }, [employeeData]);

  // #region form stuff
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  // #endregion

  // #region Handlers
  async function handleAdd() {
    await dataStore.addEmployee(
      ci,
      name,
      companyName,
      position,
      entryDate,
      bpsAfiliationNumber,
      nominalSalary,
      fonasa
    );

    setRedirect(true);
  }

  async function handleEdit() {
    await dataStore.updateEmployee(
      ci,
      name,
      companyName,
      position,
      entryDate,
      bpsAfiliationNumber,
      nominalSalary,
      fonasa
    );
    setRedirect(true);
  }
  // #endregion

  return (
    <Layout className="EmployeeContainer">
      <h1>Datos empleado:</h1>
      <Suspense fallback={<Spin size="large" />}>
        <Form
          className="EmployeeForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
        >
          <Form.Item label="CI:">
            {paramCi ? (
              <InputNumber value={ci} disabled />
            ) : (
              <InputNumber onChange={(e: number) => setCi(e)} />
            )}
          </Form.Item>

          <Form.Item label="Empresa:">
            <Select
              value={companyName}
              onChange={(e) => setCompanyName(e)}
              disabled={!!paramCompanyName}
            >
              {companiesNames.map((companyNameValue: string) => (
                <Select.Option key={companyNameValue} value={companyNameValue}>
                  {companyNameValue}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Nombre empleado:">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Posicion:">
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Fecha ingreso:">
            <DatePicker
              locale={locale}
              format="DD/MM/YYYY"
              onChange={(e) => {
                const localDate = e?.locale('es-ES').format('DD/MM/YYYY');
                setEntryDate(localDate ?? '01/01/2020');
              }}
            />
          </Form.Item>

          <Form.Item label="Numero afiliacion BPS:">
            <InputNumber
              value={bpsAfiliationNumber}
              onChange={(e: number) => setBpsAfiliationNumber(e)}
            />
          </Form.Item>

          <Form.Item label="Salario Nominal:">
            <InputNumber
              value={nominalSalary}
              onChange={(e: number) => setNominalSalary(e)}
            />
          </Form.Item>

          <Form.Item label="Fonasa:">
            <Input value={fonasa} onChange={(e) => setFonasa(e.target.value)} />
          </Form.Item>

          <Form.Item
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            {paramCi ? (
              <Button id="submitButton" onClick={() => handleEdit()}>
                Editar
              </Button>
            ) : (
              <Button id="submitButton" onClick={() => handleAdd()}>
                Agregar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Suspense>
      {redirect && <Redirect to="/employees" />}
    </Layout>
  );
}
