package com.example.uniMed.models.dutyroster;

import jakarta.persistence.*;
import java.util.List;
@Entity
public class DayOfWeek {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // E.g., "Monday"
    public DayOfWeek() {
    }
    public DayOfWeek(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "dayOfWeek")
    private List<Slot> slots;

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