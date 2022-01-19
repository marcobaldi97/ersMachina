import React, { useEffect, useState } from 'react';

import DataStore from 'core/DataStore';

import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'antd/lib/layout/layout';
import AppSider from './components/AppSider';
import Company from './components/Company/Company';
import CompanyPage from './pages/company/CompanyPage';
import EmployeePage from './pages/employee/EmployeePage';

import './App.css';
import TestPage from './pages/tester/TestPage';
import Employee from './components/Employee/Employee';

export default function App() {
  const mainPage = () => {
    return <div />;
  };

  return (
    <Layout className="site-layout">
      <Router>
        <AppSider />
        <div className="appContent">
          <Switch>
            <Route path="/companies">
              <CompanyPage />
            </Route>

            <Route path="/company/:paramName" component={Company} />

            <Route path="/employees">
              <EmployeePage />
            </Route>

            <Route
              path="/employee/:paramCi/:paramCompanyName"
              component={Employee}
            />

            <Route path="/newCompany">
              <Company />
            </Route>

            <Route path="/test">
              <TestPage />
            </Route>

            <Route path="/">{mainPage()}</Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
}
