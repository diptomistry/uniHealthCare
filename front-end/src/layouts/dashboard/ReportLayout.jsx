import React, { Fragment, useState, useEffect } from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import {
  ReportTitle,
  Address,
  TableTitle,
  TableHead,
  TableBody,
  TableTotal,
  PatientCatTypeTableTitle,
  PatientCatTypeTableHead,
  PatientCatTypeTableBody,
  GenderTableTitle,
  GenderTableHead,
  GenderTableBody,
} from "../../models/dashboard/ReportComponents";

// DashTable Components
export const DashTableTitle = ({ styles }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.tableTitle}>Dashboard</Text>
  </View>
);

export const DashTableHead = ({ styles }) => (
  <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Title</Text>
    </View>
    <View style={styles.theader}>
      <Text>Amount</Text>
    </View>
  </View>
);

export const DashTableBody = ({ dashData, styles }) => (
  dashData.map((data) => (
    <Fragment key={data.title}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{data.title}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{data.amount}</Text>
        </View>
      </View>
    </Fragment>
  ))
);

// Main Report Layout
const ReportLayout = () => {
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/stats', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        // Formatting the response into the dashData structure
        const formattedData = [
          { amount: data.appointments.dispensedAppointments, title: 'Total Appointment' },
          { amount: data.appointments.pendingAppointments, title: 'Pending Appointment' },
          { amount: data.appointments.prescribedAppointments, title: 'Prescribed Appointment' },
          { amount: data.totalUsersByRoles.student, title: 'Total Students' },
          { amount: data.users.totalDoctors, title: 'Total Doctors' },
          { amount: data.totalUsersByRoles.staff, title: 'Total Staff' },
          { amount: data.users.totalUsers, title: 'Total Users' },
          { amount: data.medicines.total, title: 'Total Medicines' },
        ];

        setDashData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReportTitle styles={styles} />
        <Address styles={styles} />
        <TableTitle styles={styles} />
        <TableHead styles={styles} />
        <TableBody styles={styles} />
        <TableTotal styles={styles} />
        <PatientCatTypeTableTitle styles={styles} />
        <PatientCatTypeTableHead styles={styles} />
        <PatientCatTypeTableBody styles={styles} />
        <GenderTableTitle styles={styles} />
        <GenderTableHead styles={styles} />
        <GenderTableBody styles={styles} />

        <View wrap={false}>
          <DashTableTitle styles={styles} />
          <DashTableHead styles={styles} />
          <DashTableBody dashData={dashData} styles={styles} />
        </View>
      </Page>
    </Document>
  );
};

export default ReportLayout;
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },
  titleContainer: { flexDirection: "row", marginTop: 24 },
  logo: { width: 90 },
  reportTitle: { fontSize: 16, textAlign: "center" },
  title: { fontSize: 16, marginTop: 10, textAlign: "left", fontWeight: "bold" },
  addressTitle: { fontSize: 11, fontStyle: "bold" },
  report: { fontWeight: "bold", fontSize: 20 },
  reportNumber: { fontSize: 11, fontWeight: "bold" },
  address: { fontWeight: 400, fontSize: 10 },
  theader: {
    marginTop: 0,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
  tableTitle: {
    fontSize: 16,
    marginBottom: 0,
    textAlign: "left",
    fontWeight: "bold",
  },
  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },
  tbody2: { flex: 2, borderRightWidth: 1 },
});