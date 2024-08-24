package com.example.uniMed.models.dutyroster;

import java.util.List;

import jakarta.persistence.*;

import com.example.uniMed.models.Doctors;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "slot")

public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  
    @Column(name = "time_slot")
    private String timeSlot;

    @ManyToMany
    @JoinTable(
      name = "slot_doctor", 
      joinColumns = @JoinColumn(name = "slot_id"), 
      inverseJoinColumns = @JoinColumn(name = "doctor_id"))
    private List<Doctors> doctors;
    
    @ManyToOne
      @JsonBackReference
    @JoinColumn(name = "day_of_week_id")
    private DayOfWeek dayOfWeek;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }
      public Slot(String timeSlot, List<Doctors> doctors, DayOfWeek dayOfWeek) {
        this.timeSlot = timeSlot;
        this.doctors = doctors;
        this.dayOfWeek = dayOfWeek;
    }
    public Slot() {
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
    

   
}