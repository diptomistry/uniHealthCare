package com.example.uniMed.models;
import jakarta.persistence.*;
// SlotDay entity
@Entity
@Table(name = "SlotDay")
public class SlotDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotDayId;

    @ManyToOne
    @JoinColumn(name = "SlotID")
    private Slot slot;

    @Column(name = "Day")
    private String day;

    public Long getSlotDayId() {
        return slotDayId;
    }

    public void setSlotDayId(Long slotDayId) {
        this.slotDayId = slotDayId;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    // Getters and setters
}