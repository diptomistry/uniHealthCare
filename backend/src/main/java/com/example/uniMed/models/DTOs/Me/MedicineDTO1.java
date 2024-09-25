package com.example.uniMed.models.DTOs.Me;


import java.util.Date;

import com.example.uniMed.models.User;
import com.example.uniMed.models.DTOs.UserDTO;

public class MedicineDTO1 {
    private String name;
    private Date entryDate;
    private Date expiryDate;
    private String description;
    private Long price;
    private Boolean isOutside;
    private Integer stockQuantity;
    private Long addedBy;


   

    // Getters and Setters
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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Boolean getIsOutside() {
        return isOutside;
    }

    public void setIsOutside(Boolean isOutside) {
        this.isOutside = isOutside;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }



    @Override
    public String toString() {
        return "MedicineDTO1 [name=" + name + ", entryDate=" + entryDate + ", expiryDate=" + expiryDate
                + ", description=" + description + ", price=" + price + ", isOutside=" + isOutside + ", stockQuantity="
                + stockQuantity + ", addedBy=" + "112" + "]";
    }

    public Long getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Long addedBy) {
        this.addedBy = addedBy;
    }
}