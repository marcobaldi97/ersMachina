/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import Layout from 'antd/lib/layout/layout';
import locale from 'antd/lib/date-picker/locale/es_ES';

type SizeType = Parameters<typeof Form>[0]['size'];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmployeePageProps {}

export default function EmployeePage(props: EmployeePageProps) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return <Layout className="" />;
}
