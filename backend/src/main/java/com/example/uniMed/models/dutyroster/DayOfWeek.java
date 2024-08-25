package com.example.uniMed.models.dutyroster;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Table(name = "day_of_week")
public class DayOfWeek {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // E.g., "Sunday", "Monday", etc.

    @OneToMany(mappedBy = "dayOfWeek")
     @JsonIgnore
    private List<Slot> slots;


    public DayOfWeek() {
    }
    public DayOfWeek(String name, List<Slot> slots) {
        this.name = name;
        this.slots = slots;
    }
    public DayOfWeek(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Slot> getSlots() {
        return slots;
    }

    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }


    // Getters and Setters
}