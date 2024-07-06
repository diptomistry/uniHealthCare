package com.example.uniMed.models;
import jakarta.persistence.*;
import java.io.Serializable;

@Embeddable
class SlotDayId implements Serializable {
    private int slotID;
    private String day;

    // Getters, Setters, equals(), and hashCode()
}