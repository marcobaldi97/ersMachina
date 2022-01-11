/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import DataStore from 'core/DataStore';

import { List } from 'antd';
import Layout from 'antd/lib/layout/layout';

import './CompanyPage.styles.scss';

export default function CompanyPage() {
  const dataStore = DataStore.getInstance();

  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    dataStore
      .fetchCompanies()
      .then((companiesToSet: string[]) =>
        setCompanies(Array.from(companiesToSet))
      )
      .catch((error) => console.error(error));
  });

  return (
    <Layout>
      <h1>Empresas:</h1>
      {companies.length > 0 && (
        <List>
          {companies.map((company) => (
            <List.Item key={company.key} onClick={() => alert('Boo!')}>
              {company.name}
            </List.Item>
          ))}
        </List>
      )}
    </Layout>
  );
}
