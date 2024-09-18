package com.example.uniMed.models.dispensary;

import jakarta.persistence.*;
import java.util.Date;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;

@Entity
public class MedicineRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date requestDate;


    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicines medicine;

    public Medicines getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicines medicine) {
        this.medicine = medicine;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "requestedBy")
    private User requestedBy;

    @Temporal(TemporalType.DATE)
    private Date stockEndDate;

    private String status; // e.g., PENDING, APPROVED, REJECTED

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public User getRequestedBy() {
        return requestedBy;
    }
    public void setRequestedBy(User requestedBy) {
        this.requestedBy = requestedBy;
    }

    public Date getStockEndDate() {
        return stockEndDate;
    }

    public void setStockEndDate(Date stockEndDate) {
        this.stockEndDate = stockEndDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}