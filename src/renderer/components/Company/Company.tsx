/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { Button, Form, Input, InputNumber } from 'antd';
import Layout from 'antd/lib/layout/layout';

type SizeType = Parameters<typeof Form>[0]['size'];

export interface CompanyProps {
  name?: string;
}

export default function Company(props: CompanyProps) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { name } = props;

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
          {name ? <Input value={name} disabled /> : <Input />}
        </Form.Item>

        <Form.Item label="Dirección:">
          <Input />
        </Form.Item>

        <Form.Item label="Rut:">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Numero mtss:">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Grupo:">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Sub Grupo:">
          <InputNumber />
        </Form.Item>

        <Form.Item
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Button id="submitButton">Editar / Agregar</Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}
