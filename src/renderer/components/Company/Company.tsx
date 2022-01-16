/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import { Button, Form, Input, InputNumber } from 'antd';
import Layout from 'antd/lib/layout/layout';
import DataStore, { CompanyInterface } from 'core/DataStore';
import { NavLink, Redirect, useParams } from 'react-router-dom';

type SizeType = Parameters<typeof Form>[0]['size'];

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

      setCompanyName(company.name);
      setaddress(company.address);
      setRut(company.rut);
      setMtssNumber(company.mtssNumber);
      setgroup(company.cgroup);
      setsubgroup(company.subgroup);
    };

    if (paramName) fetchData(paramName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

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
      <Form
        className="companyForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="Nombre empresa">
          {paramName ? (
            <Input value={paramName} disabled />
          ) : (
            <Input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
          )}
        </Form.Item>

        <Form.Item label="Dirección:">
          <Input
            value={address}
            onChange={(event) => setaddress(event.target.value)}
          />
        </Form.Item>

        <Form.Item label="Rut:">
          <InputNumber value={rut} onChange={(value) => setRut(value)} />
        </Form.Item>

        <Form.Item label="Numero mtss:">
          <InputNumber
            value={mtssNumber}
            onChange={(value) => setMtssNumber(value)}
          />
        </Form.Item>

        <Form.Item label="Grupo:">
          <InputNumber value={group} onChange={(value) => setgroup(value)} />
        </Form.Item>

        <Form.Item label="Sub Grupo:">
          <InputNumber
            value={subgroup}
            onChange={(value) => setsubgroup(value)}
          />
        </Form.Item>

        <Form.Item
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Button
            id="submitButton"
            onClick={() => (paramName ? handleEdit() : handleAdd())}
          >
            {paramName ? 'Editar' : 'Agregar'}
          </Button>
        </Form.Item>
      </Form>
      {redirect && <Redirect to="/companies" />}
    </Layout>
  );
}
