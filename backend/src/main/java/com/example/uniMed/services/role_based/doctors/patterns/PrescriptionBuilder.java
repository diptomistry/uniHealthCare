package com.example.uniMed.services.role_based.doctors.patterns;

import java.util.Date;

import com.example.uniMed.models.Doctors;
import com.example.uniMed.models.User;
import com.example.uniMed.models.medicine.Prescription;
public class PrescriptionBuilder {

    private String description;
    private String diagnosis;
    private String date;
    private Doctors doctor;
    private User patient;

    public PrescriptionBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public PrescriptionBuilder withDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
        return this;
    }

    public PrescriptionBuilder withDate(String date) {
        this.date = date;
        return this;
    }

    public PrescriptionBuilder withDoctor(Doctors doctor) {
        this.doctor = doctor;
        return this;
    }

    public PrescriptionBuilder withPatient(User patient) {
        this.patient = patient;
        return this;
    }

    public Prescription build() {
        Prescription prescription = new Prescription();
        prescription.setDescription(this.description);
        prescription.setDiagnosis(this.diagnosis);
        prescription.setDate(this.date != null ? this.date : new Date().toString());
        prescription.setDoctor(this.doctor);
        prescription.setPatient(this.patient);
        return prescription;
    }
}