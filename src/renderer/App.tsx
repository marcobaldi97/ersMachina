import React, { useEffect, useState } from 'react';

import DataStore from 'core/DataStore';

import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'antd/lib/layout/layout';
import AppSider from './components/AppSider';
import CompanyPage from './pages/company/CompanyPage';
import EmployeePage from './pages/employee/EmployeePage';

import './App.css';

export default function App() {
  const dataStore = DataStore.getInstance();

  const mainPage = () => {
    return <div />;
  };

  return (
    <Layout className="site-layout">
      <Router>
        <AppSider />
        <div className="appContent">
          <Switch>
            <Route path="/company">
              <CompanyPage />
            </Route>
            <Route path="/employee">
              <EmployeePage />
            </Route>
            <Route path="/">{mainPage()}</Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
}
