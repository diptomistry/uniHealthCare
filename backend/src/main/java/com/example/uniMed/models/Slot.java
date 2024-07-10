package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalTime;

import java.util.Set;

// Slot entity
@Entity
@Table(name = "Slot")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @Column(name = "StartTime")
    private LocalTime startTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    @OneToMany(mappedBy = "slot")
    private Set<SlotDay> slotDays;

    @OneToMany(mappedBy = "slot")
    private Set<DoctorSlot> doctorSlots;

    public Long getSlotId() {
        return slotId;
    }

    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Set<SlotDay> getSlotDays() {
        return slotDays;
    }

    public void setSlotDays(Set<SlotDay> slotDays) {
        this.slotDays = slotDays;
    }

    public Set<DoctorSlot> getDoctorSlots() {
        return doctorSlots;
    }

    public void setDoctorSlots(Set<DoctorSlot> doctorSlots) {
        this.doctorSlots = doctorSlots;
    }

    // Getters and setters
}

