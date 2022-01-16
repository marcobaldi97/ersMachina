/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Suspense, useEffect, useState } from 'react';

import DataStore from 'core/DataStore';

import { Button, List, Spin } from 'antd';
import Layout from 'antd/lib/layout/layout';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import './CompanyPage.styles.scss';
import { Link, Redirect } from 'react-router-dom';

export default function CompanyPage() {
  const dataStore = DataStore.getInstance();

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyToEdit, setcompanyToEdit] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dataStore
      .fetchCompanies()
      .then((companiesToSet: string[]) => {
        setCompanies(Array.from(companiesToSet));
        setLoading(false);
        return 0;
      })
      .catch((error) => console.error(error));
  });

  function handleClick() {}

  function handleDelete(companyName: string) {
    if (confirm(`¿Está seguro de eliminar la empresa ${companyName}?`)) {
      dataStore.deleteCompany(companyName);
      setCompanies(companies.filter((company) => company !== companyName));
    }
  }

  function handleEdit(companyName: string) {
    setcompanyToEdit(companyName);
  }

  return (
    <Layout>
      <Suspense fallback={<Spin size="large" />}>
        <List
          header={<h1>Empresas</h1>}
          bordered
          loading={loading}
          dataSource={companies}
          renderItem={(company) => (
            <List.Item
              className="listItem"
              key={company.key}
              onClick={() => handleClick()}
            >
              <div>{company.name}</div>

              <div className="editDeleteButtons">
                <DeleteOutlined
                  className="deleteButton"
                  onClick={() => handleDelete(company.name)}
                />
                <EditOutlined
                  className="editButton"
                  onClick={() => handleEdit(company.name)}
                />
              </div>
            </List.Item>
          )}
        />

        <Button>
          <Link to="/newCompany">Agregar</Link>
        </Button>
      </Suspense>
      {companyToEdit && <Redirect to={`company/${companyToEdit}`} />}
    </Layout>
  ); // fix this and make a proper page.
}
