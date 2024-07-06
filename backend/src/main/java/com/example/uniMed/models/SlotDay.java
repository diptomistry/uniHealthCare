package com.example.uniMed.models;
import jakarta.persistence.*;
// SlotDay entity
@Entity
@Table(name = "SlotDay")
public class SlotDay {
    @EmbeddedId
    private SlotDayId id;

    @MapsId("slotID")
    @ManyToOne
    @JoinColumn(name = "slotID")
    private Slot slot;

   

    // Getters and Setters
}
