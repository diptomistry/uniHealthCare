import React from 'react';
import {  Page, Document, StyleSheet } from '@react-pdf/renderer';

import { InvoiceTitle, Address, UserAddress, TableHead, TableBody, TableTotal  } from '../../models/dashboard/InvoiceComponents';

const styles = StyleSheet.create({
    page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },
    spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },
    titleContainer: { flexDirection: 'row', marginTop: 24 },
    logo: { width: 90 },
    reportTitle: { fontSize: 16, textAlign: 'center' },
    addressTitle: { fontSize: 11, fontStyle: 'bold' },
    invoice: { fontWeight: 'bold', fontSize: 20 },
    invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
    address: { fontWeight: 400, fontSize: 10 },
    theader: { marginTop: 20, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
    tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
    total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },
    tbody2: { flex: 2, borderRightWidth: 1, }
});

const Invoice = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle styles={styles} />
                <Address styles={styles} />
                <UserAddress styles={styles} />
                <TableHead styles={styles} />
                <TableBody styles={styles} />
                <TableTotal styles={styles} />
            </Page>
        </Document>
    );
}

export default Invoice;
