import React, { useEffect, useState } from 'react';

import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'antd/lib/layout/layout';
import AppSider from './components/AppSider';
import CompanyPage from './pages/company/CompanyPage';
import EmployeePage from './pages/employee/EmployeePage';

import './App.css';

export default function App() {
  const mainPage = () => {
    return <div />;
  };

  return (
    <Router>
      <Switch>
        <Layout className="site-layout">
          <AppSider />
          <div className="appContent">
            <Route path="/">{mainPage()}</Route>
            <Route path="/company">
              <CompanyPage />
            </Route>
            <Route path="/employee">
              <EmployeePage />
            </Route>
          </div>
        </Layout>
      </Switch>
    </Router>
  );
}
