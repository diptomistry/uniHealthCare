package com.example.uniMed.models;
import jakarta.persistence.*;
import java.io.Serializable;
@Entity
@Table(name = "DoctorSlot")
public class DoctorSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "DoctorID")
    private Doctors doctor;

    @ManyToOne
    @JoinColumn(name = "SlotID")
    private Slot slot;

    @ManyToOne
    @JoinColumn(name = "DutyRosterID")
    private DutyRoster dutyRoster;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctors getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public DutyRoster getDutyRoster() {
        return dutyRoster;
    }

    public void setDutyRoster(DutyRoster dutyRoster) {
        this.dutyRoster = dutyRoster;
    }

    // Getters and setters
}