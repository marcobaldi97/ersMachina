/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import Layout from 'antd/lib/layout/layout';
import locale from 'antd/lib/date-picker/locale/es_ES';

type SizeType = Parameters<typeof Form>[0]['size'];

export interface EmployeeProps {
  ci?: string;
}

export default function Employee(props: EmployeeProps) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { ci } = props;

  return (
    <Layout className="">
      <h1>Datos empleado:</h1>
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
          {ci ? <InputNumber value={ci} disabled /> : <InputNumber />}
        </Form.Item>

        <Form.Item label="Nombre empleado:">
          <Input />
        </Form.Item>

        <Form.Item label="Fecha ingreso:">
          <DatePicker locale={locale} />
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
