import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
} from 'antd';

export interface SimpleDynamicFormItem {
  type: 'Text' | 'Number' | 'Date';
  value: any;
  onChange: (value: any) => void;
}

export interface SimpleDynamicFormProps {
  className: string;
  items: SimpleDynamicFormItem[];
  locale?: string;
  dateFormat?: string;
}

/**
 * The objective of this component is to provide a simple way to create a form with dynamic fields given the proper parameters.
 * Next objective: Allow the use of Select.
 * */
export default function SimpleDynamicForm(props: SimpleDynamicFormProps) {
  const { className, items, locale, dateFormat } = props;

  // #region form stuff
  type SizeType = Parameters<typeof Form>[0]['size'];
  // eslint-disable-next-line no-undef
  const [componentSize, setComponentSize] = useState < SizeType > 'default';
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  function renderInput(item) {
    switch (item.type) {
      case 'Text':
        <Input value={item.value} onChange={(e) => item.changeHandler(e)} />;
        break;
      case 'Number':
        <InputNumber
          value={item.value}
          onChange={(e) => item.changeHandler(e)}
        />;
        break;
      case 'Date':
        <DatePicker
          locale={locale ?? 'es-ES'}
          format={dateFormat ?? 'DD/MM/YYYY'}
          value={item.value}
          onChange={(e) => item.changeHandler(e)}
        />;
        break;

      default:
        break;
    }
  }
  // #endregion
  function renderItems() {
    return items.map((item, index) => {
      return (
        <Form.Item
          // eslint-disable-next-line react/no-array-index-key
          key={`Item-key-${index}`}
          label={item.label}
          name={item.name}
          style={{ marginBottom: '8px' }}
        >
          {renderInput(item)}
        </Form.Item>
      );
    });
  }

  return (
    <Form
      className={className}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      {renderItems()}
    </Form>
  );
}
