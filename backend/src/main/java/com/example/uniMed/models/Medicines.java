package com.example.uniMed.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Medicines {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer medicineID;

    private String name;
    private Date entryDate;
    private Date expiryDate;
    private String description;
    private BigDecimal price;
    private Boolean is_Outside;
    private Integer stockQuantity;
    private Boolean isDeleted = false;
    
    @ManyToOne
    @JoinColumn(name = "addedBy")
    private User addedBy;
    public Boolean getIsDeleted() {
        return isDeleted;
    }
    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    public Medicines() {
    }
    public Integer getMedicineID() {
        return medicineID;
    }
    public void setMedicineID(Integer medicineID) {
        this.medicineID = medicineID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Date getEntryDate() {
        return entryDate;
    }
    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }
    public Date getExpiryDate() {
        return expiryDate;
    }
    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    public Boolean getIs_Outside() {
        return is_Outside;
    }
    public void setIs_Outside(Boolean is_Outside) {
        this.is_Outside = is_Outside;
    }
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
    public User getAddedBy() {
        return addedBy;
    }
    public void setAddedBy(User addedBy) {
        this.addedBy = addedBy;
    }

    

}