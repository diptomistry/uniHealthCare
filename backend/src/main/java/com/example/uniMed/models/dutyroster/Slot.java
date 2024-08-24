package com.example.uniMed.models.dutyroster;

import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import com.example.uniMed.models.Doctors;


@Entity
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String timeSlot; // E.g., "09:00-12:00"

    @ManyToMany
    @JoinTable(
      name = "slot_doctor", 
      joinColumns = @JoinColumn(name = "slot_id"), 
      inverseJoinColumns = @JoinColumn(name = "doctor_id"))
    private List<Doctors> doctors;

    @ManyToOne
    @JoinColumn(name = "day_of_week_id")
    private DayOfWeek dayOfWeek;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getTimeSlot() {
      return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
      this.timeSlot = timeSlot;
    }

    public List<Doctors> getDoctors() {
      return doctors;
    }

    public void setDoctors(List<Doctors> doctors) {
      this.doctors = doctors;
    }

    public DayOfWeek getDayOfWeek() {
      return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
      this.dayOfWeek = dayOfWeek;
    }
    

    // Getters and Setters
}