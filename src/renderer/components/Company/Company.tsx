/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Suspense, useEffect, useState } from 'react';

import { Button, Spin, Form, Input, InputNumber } from 'antd';
import Layout from 'antd/lib/layout/layout';
import DataStore from 'core/DataStore';
import { Redirect, useParams } from 'react-router-dom';

export default function Company(props: any) {
  const dataStore = DataStore.getInstance();
  const { paramName } = useParams<{ paramName: string }>();

  const [companyName, setCompanyName] = useState(paramName ?? '');
  const [address, setaddress] = useState('');
  const [rut, setRut] = useState(0);
  const [mtssNumber, setMtssNumber] = useState(0);
  const [group, setgroup] = useState(0);
  const [subgroup, setsubgroup] = useState(0);
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    const fetchData = async (nameParam: string) => {
      const company = await dataStore.getCompany(nameParam);

      console.dir(company);

      setCompanyName(company.name);
      setaddress(company.address);
      setRut(company.rut);
      setMtssNumber(company.mtssNumber);
      setgroup(company.cgroup);
      setsubgroup(company.subgroup);
    };

    if (paramName) {
      fetchData(paramName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleEdit() {
    await dataStore.updateCompany(
      companyName,
      rut,
      address,
      mtssNumber,
      group,
      subgroup
    );
    setredirect(true);
  }

  async function handleAdd() {
    const name = companyName;
    const cgroup = group;

    await dataStore.addCompany({
      name,
      rut,
      address,
      mtssNumber,
      cgroup,
      subgroup,
    });
    setredirect(true);
  }

  return (
    <Layout className="Company">
      <h1>Datos empresa:</h1>
      <Suspense fallback={<Spin size="large" />}>
        <Form>
          <Form.Item label="Nombre">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Rut">
            <InputNumber value={rut} onChange={(value) => setRut(value)} />
          </Form.Item>

          <Form.Item label="Dirección">
            <Input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Número MTSS">
            <InputNumber
              value={mtssNumber}
              onChange={(value) => setMtssNumber(value)}
            />
          </Form.Item>

          <Form.Item label="Grupo">
            <InputNumber value={group} onChange={(value) => setgroup(value)} />
          </Form.Item>

          <Form.Item label="Subgrupo">
            <InputNumber
              value={subgroup}
              onChange={(value) => setsubgroup(value)}
            />
          </Form.Item>

          <Button
            id="submitButton"
            onClick={() => (paramName ? handleEdit() : handleAdd())}
          >
            {paramName ? 'Editar' : 'Agregar'}
          </Button>
        </Form>
      </Suspense>
      {redirect && <Redirect to="/companies" />}
    </Layout>
  );
}
