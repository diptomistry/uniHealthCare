import React, { Fragment} from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import logo from '../../assets/img/dumc.png';

export const reciept_data = {
    "id": "12345678",
    "date": "24-09-2024",
    "expanse": "1000000 BDT",
};
export const doctorData = [
    {
        "id": 1,
        "desc": "Dr. John Doe",
        "department": "Cardiology",
        "rank": 1,
        "patients": 25
    },
    {
        "id": 2,
        "desc": "Dr. Jane Smith",
        "department": "Neurology",
        "rank": 2,
        "patients": 18
    },
    {
        "id": 3,
        "desc": "Dr. Robert Brown",
        "department": "Pediatrics",
        "rank": 3,
        "patients": 20
    },
    {
        "id": 4,
        "desc": "Dr. Emily White",
        "department": "Orthopedics",
        "rank": 4,
        "patients": 15
    },
    {
        "id": 5,
        "desc": "Dr. Michael Green",
        "department": "Oncology",
        "rank": 5,
        "patients": 30
    }
];
export const patientGenderData = [
    { "gender": "Male", "count": 45 },
    { "gender": "Female", "count": 55 },
];

export const patientTypeData = [
    { "type": "New", "count": 30 },
    { "type": "Returning", "count": 70 },
];
export const patientCat = [
    { "type": "Student", "count": 30 },
    { "type": "Others", "count": 70 },
];
export const medicineDistributionAmongPatients = [
    { "type": "Student", "count": 20 },
    { "type": "Others", "count": 30 },
];
export const noOfMedicalTests = [
    { "type": "Blood Test", "count": 20 },
    { "type": "X-ray", "count": 30 },
    { "type": "MRI", "count": 40 },
    
];
  

export const ReportTitle = ({ styles }) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <Image style={styles.logo} src={logo} />
            <Text style={styles.reportTitle}>Monthly Analytical Report</Text>
            
        </View>
    </View>
);

export const Address = ({ styles }) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View>
                <Text style={styles.Report}>Shahid Buddhijibe Dr. Muhammad Mortaza  </Text>
                <Text style={styles.ReportNumber}>Medical Centre Report  </Text>
                <Text style={styles.addressTitle}>{reciept_data.date}</Text>
            </View>
            <View>
                <Text style={styles.addressTitle}>Dhaka 1000, Bangladesh </Text>
                <Text style={styles.addressTitle}>Near the Science Annex Building</Text>
                <Text style={styles.addressTitle}>cmo.dumc@gmail.com, +88 09666 911 463 (Ext.)</Text>
            </View>
        </View>
    </View>
);


export const TableTitle = ({ styles }) => (
    <View style={{ marginTop: 20}}>
        <Text style={styles.tableTitle}>Doctors</Text>
    </View>
);

export const TableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Name</Text>
        </View>
        <View style={styles.theader}>
            <Text>Department</Text>
        </View>
        <View style={styles.theader}>
            <Text>No. of Doctors</Text>
        </View>
    </View>
);

export const TableBody = ({ styles }) => (
    doctorData.map((doctor) => (
        <Fragment key={doctor.id}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{doctor.desc}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{doctor.department}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{doctor.patients}</Text>
                </View>
            </View>
        </Fragment>
    ))
);


export const TableTotal = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={[styles.tbody, styles.tbody2]}>
            <Text></Text>
        </View>
        <View style={styles.tbody}>
            <Text>Total Doctors</Text>
        </View>
        <View style={styles.tbody}>
            <Text>
                {doctorData.reduce((sum, doctor) => sum + doctor.patients, 0)}
            </Text>
        </View>
    </View>
);

// Table for number of patients by gender
export const GenderTableTitle = ({ styles }) => (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.tableTitle}>Number of Patients by Gender</Text>
    </View>
);

export const GenderTableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Gender</Text>
        </View>
        <View style={styles.theader}>
            <Text>Number of Patients</Text>
        </View>
    </View>
);

export const GenderTableBody = ({ styles }) => (
    patientGenderData.map((gender) => (
        <Fragment key={gender.gender}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{gender.gender}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{gender.count}</Text>
                </View>
            </View>
        </Fragment>
    ))
);

// Table for number of new and returning patients
export const PatientTypeTableTitle = ({ styles }) => (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.tableTitle}>Number of New and Returning Patients</Text>
    </View>
);

export const PatientTypeTableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Patient Type</Text>
        </View>
        <View style={styles.theader}>
            <Text>Number of Patients</Text>
        </View>
    </View>
);

export const PatientTypeTableBody = ({ styles }) => (
    patientTypeData.map((type) => (
        <Fragment key={type.type}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{type.type}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{type.count}</Text>
                </View>
            </View>
        </Fragment>
    ))
);
export const PatientCatTypeTableTitle = ({ styles }) => (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.tableTitle}>Patient Catagory</Text>
    </View>
);

export const PatientCatTypeTableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Patient Type</Text>
        </View>
        <View style={styles.theader}>
            <Text>Number of Patients</Text>
        </View>
    </View>
);

export const PatientCatTypeTableBody = ({ styles }) => (
    patientCat.map((type) => (
        <Fragment key={type.type}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{type.type}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{type.count}</Text>
                </View>
            </View>
        </Fragment>
    ))
);
export const MedicinePatientTypeTableTitle = ({ styles }) => (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.tableTitle}>Medicine Distribution among Patients</Text>
    </View>
);

export const MedicinePatientTypeTableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Patient Type</Text>
        </View>
        <View style={styles.theader}>
            <Text>Number of Patients</Text>
        </View>
    </View>
);

export const MedicinePatientTypeTableBody = ({ styles }) => (
    medicineDistributionAmongPatients.map((type) => (
        <Fragment key={type.type}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{type.type}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{type.count}</Text>
                </View>
            </View>
        </Fragment>
    ))
);
export const NoOfMedicalTestsTableTitle = ({ styles }) => (
    <View style={{ marginTop: 20 }}>
        <Text style={styles.tableTitle}>Medicine Tests</Text>
    </View>
);

export const NoOfMedicalTestsTableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Patient Type</Text>
        </View>
        <View style={styles.theader}>
            <Text>Number of Patients</Text>
        </View>
    </View>
);

export const NoOfMedicalTestsTableBody = ({ styles }) => (
    noOfMedicalTests.map((type) => (
        <Fragment key={type.type}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{type.type}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{type.count}</Text>
                </View>
            </View>
        </Fragment>
    ))
);
export const TotalExpenses = ({ styles }) => (
    <View>
        <Text style={styles.title}>Total Expanses:</Text>
        <Text style={styles.ReportNumber}>{reciept_data.expanse}  </Text>
    </View>
);
export const dashData = [
    {
     
      amount: "39,354",
     
      title: "Total Appointment",
     
    },
    {
     
      amount: "4,396",
     
      title: "Pending Appointment",
     
    },
    {
        amount: "423,39",

        title: "Prescribed Appointment",
    },
    {
        amount: "39,354",

        title: "Total Students",
    },
    {
        amount: "39,354",

      title: "Total Doctors",
    },
    {
        amount: "39,354",
      
        title: "Total Stuffs",
    },
    {
        amount: "99,354",

      title: "Total Users",
    },
    {
        amount: "39,354",

        title: "Total Medicines",
    },
  ];
 
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
export const DashTableBody = ({ styles }) => (
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

