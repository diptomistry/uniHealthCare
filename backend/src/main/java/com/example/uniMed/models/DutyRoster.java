package com.example.uniMed.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "DutyRoster")
public class DutyRoster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dutyRosterId;

    @ManyToOne
    @JoinColumn(name = "DoctorID")
    private Doctors doctor;

    public Long getDutyRosterId() {
        return dutyRosterId;
    }

    public void setDutyRosterId(Long dutyRosterId) {
        this.dutyRosterId = dutyRosterId;
    }

    public Doctors getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }

    public Set<DoctorSlot> getDoctorSlots() {
        return doctorSlots;
    }

    public void setDoctorSlots(Set<DoctorSlot> doctorSlots) {
        this.doctorSlots = doctorSlots;
    }

    @OneToMany(mappedBy = "dutyRoster")
    private Set<DoctorSlot> doctorSlots;

   
}
