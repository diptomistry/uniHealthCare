package com.example.uniMed.models.dispensary;



import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;

@Entity
public class DispenseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicines medicine;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "dispenseRequestID")
    private List<DispensedMedicine> dispensedMedicines;



    public List<DispensedMedicine> getDispensedMedicines() {
        return dispensedMedicines;
    }

    public void setDispensedMedicines(List<DispensedMedicine> dispensedMedicines) {
        this.dispensedMedicines = dispensedMedicines;
    }

    @ManyToOne
    @JoinColumn(name = "requestedBy")
    private User requestedBy;

    private Integer dispensedQuantity;

    @Temporal(TemporalType.DATE)
    private Date dispenseDate;

    @ManyToOne
    @JoinColumn(name = "appointmentID")
    private Appointments appointment;

    private String status; // e.g., PENDING, DISPENSED

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Medicines getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicines medicine) {
        this.medicine = medicine;
    }

    public User getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(User requestedBy) {
        this.requestedBy = requestedBy;
    }

    public Integer getDispensedQuantity() {
        return dispensedQuantity;
    }

    public void setDispensedQuantity(Integer dispensedQuantity) {
        this.dispensedQuantity = dispensedQuantity;
    }

    public Date getDispenseDate() {
        return dispenseDate;
    }

    public void setDispenseDate(Date dispenseDate) {
        this.dispenseDate = dispenseDate;
    }

    public Appointments getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointments appointment) {
        this.appointment = appointment;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}