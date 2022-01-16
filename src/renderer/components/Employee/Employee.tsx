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
import DataStore from 'core/DataStore';
import { Redirect } from 'react-router-dom';

type SizeType = Parameters<typeof Form>[0]['size'];

export interface EmployeeProps {
  companyNameParam?: string;
  ciParam?: number;
}

export default function Employee(props: EmployeeProps) {
  const { ciParam, companyNameParam } = props;

  const dataStore = DataStore.getInstance();

  const [companyName, setCompanyName] = useState(companyNameParam ?? '');
  const [ci, setCi] = useState(ciParam ?? 0);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [entryDate, setEntryDate] = useState(''); // the date is in the formar dd/mm/yyyy
  const [bpsAfiliationNumber, setBpsAfiliationNumber] = useState(0);
  const [nominalSalary, setNominalSalary] = useState(0);
  const [fonasa, setFonasa] = useState('');
  const [companiesNames, setCompaniesNames] = useState<string[]>([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const companies = await dataStore.fetchCompaniesNames();
      setCompaniesNames(companies);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // #region form stuff
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  // #endregion
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
    console.log('added');

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

  return (
    <Layout className="">
      <h1>Datos empleado:</h1>
      <Suspense fallback={<Spin size="large" />}>
        <Form
          className=""
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
        >
          <Form.Item label="CI:">
            {ciParam ? (
              <InputNumber value={ci} disabled />
            ) : (
              <InputNumber onChange={(e: number) => setCi(e)} />
            )}
          </Form.Item>

          <Form.Item label="Empresa:">
            {!companyNameParam && (
              <Select value={companyName} onChange={(e) => setCompanyName(e)}>
                {companiesNames.map((companyNameValue: string) => (
                  <Select.Option
                    key={companyNameValue}
                    value={companyNameValue}
                  >
                    {companyNameValue}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Nombre empleado:">
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Posicion:">
            <Input onChange={(e) => setPosition(e.target.value)} />
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
            <InputNumber onChange={(e: number) => setBpsAfiliationNumber(e)} />
          </Form.Item>

          <Form.Item label="Salario Nominal:">
            <InputNumber onChange={(e: number) => setNominalSalary(e)} />
          </Form.Item>

          <Form.Item label="Fonasa:">
            <Input onChange={(e) => setFonasa(e.target.value)} />
          </Form.Item>

          <Form.Item
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            {ciParam ? (
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
