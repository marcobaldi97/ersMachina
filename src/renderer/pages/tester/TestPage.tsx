import React from 'react';
import {
  Document,
  Page,
  PDFViewer,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

import './TestPage.styles.scss';
import Layout from 'antd/lib/layout/layout';

export default function TestPage() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  return (
    <Layout className="wrapper">
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Hello world!</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Layout>
  );
}
