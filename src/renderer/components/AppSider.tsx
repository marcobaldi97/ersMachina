/* eslint-disable jsx-a11y/label-has-associated-control */
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { Link } from 'react-router-dom';

export default function AppSider() {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" title="Empresa">
          <Menu.Item key="1">
            <Link to="/company">Datos empresa</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/employee">Datos empleado</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
