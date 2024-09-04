import React from "react";
import { Page, Document, StyleSheet,View } from "@react-pdf/renderer";

import {
  ReportTitle,
  Address,
  TableTitle,
  TableHead,
  TableBody,
  TableTotal,
  GenderTableTitle,
  GenderTableHead,
  GenderTableBody,
  PatientTypeTableTitle,
  PatientTypeTableHead,
  PatientTypeTableBody,
  MedicinePatientTypeTableTitle,
  MedicinePatientTypeTableHead,
  MedicinePatientTypeTableBody,
  PatientCatTypeTableTitle,
  PatientCatTypeTableHead,
  PatientCatTypeTableBody,
  NoOfMedicalTestsTableTitle,
  NoOfMedicalTestsTableHead,
  NoOfMedicalTestsTableBody,
  TotalExpenses,
} from "../../models/dashboard/ReportComponents";

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

const ReportLayout = () => {
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
        <PatientTypeTableTitle styles={styles} />
        <PatientTypeTableHead styles={styles} />
        <PatientTypeTableBody styles={styles} />
        <View wrap={false}>
          <MedicinePatientTypeTableTitle styles={styles} />
          <MedicinePatientTypeTableHead styles={styles} />
          <MedicinePatientTypeTableBody styles={styles} />
        </View>
        <NoOfMedicalTestsTableTitle styles={styles} />
        <NoOfMedicalTestsTableHead styles={styles} />
        <NoOfMedicalTestsTableBody styles={styles} />
        <TotalExpenses styles={styles} />
      
      </Page>
    </Document>
  );
};

export default ReportLayout;
