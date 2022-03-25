/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Menu, Switch, Button } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import DataStore from 'core/DataStore';

export default function AppSider() {
  const dataStore = DataStore.getInstance();

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" title="Administracion">
          <Menu.Item key="1">
            <Link to="/companies">Empresas</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employees">Empleados</Link>
          </Menu.Item>
        </SubMenu>
        {false && (
          <Menu.Item key="3">
            <Link to="/test">Test</Link>
          </Menu.Item>
        )}

        <Button onClick={() => dataStore.printEveryPaycheck(new Date())}>
          Imprimir recibos
        </Button>

        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbFilled />}
          defaultChecked
          onClick={() => {}}
        />
      </Menu>
    </Sider>
  );
}
