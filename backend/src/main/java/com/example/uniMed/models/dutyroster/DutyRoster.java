package com.example.uniMed.models.dutyroster;
import java.time.DayOfWeek;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import com.example.uniMed.models.Doctors;

@Entity
public class DutyRoster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;



   @Column(name = "slot_time")

    private String slotTime;


    public String getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(String slotTime) {
        this.slotTime = slotTime;
    }

    @ManyToMany
    @JoinTable(
        name = "duty_roster_doctors",
        joinColumns = @JoinColumn(name = "duty_roster_id"),
        inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private Set<Doctors> assignedDoctors = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

  

    public Set<Doctors> getAssignedDoctors() {
        return assignedDoctors;
    }

    @Override
    public String toString() {
        return "DutyRoster [id=" + id + ", dayOfWeek=" + dayOfWeek + ", slotTime=" + slotTime + ", assignedDoctors="
                + assignedDoctors + ", getSlotTime()=" + getSlotTime() + ", getId()=" + getId() + ", getDayOfWeek()="
                + getDayOfWeek() + ", getAssignedDoctors()=" + getAssignedDoctors() + ", getClass()=" + getClass()
                + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
    }

    public void setAssignedDoctors(Set<Doctors> assignedDoctors) {
        this.assignedDoctors = assignedDoctors;
    }

    // Getters and setters
}