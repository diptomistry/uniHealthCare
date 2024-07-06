package com.example.uniMed.models;
import jakarta.persistence.*;
import java.io.Serializable;
// DoctorSlot entity
@Entity
@Table(name = "DoctorSlot")
public class DoctorSlot {
    @EmbeddedId
    private DoctorSlotId id;

    @MapsId("doctorID")
    @ManyToOne
    @JoinColumn(name = "doctorID")
    private Doctors doctor;

    @MapsId("slotID")
    @ManyToOne
    @JoinColumn(name = "slotID")
    private Slot slot;

    // Getters and Setters
}
@Embeddable
class DoctorSlotId implements Serializable {
    private int doctorID;
    private int slotID;

    // Getters, Setters, equals(), and hashCode()
}