package com.example.uniMed.models.dispensary;
import jakarta.persistence.*;
import com.example.uniMed.models.Medicines;

@Entity
public class DispensedMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "medicineID")
    private Medicines medicine;

    private Integer dispensedQuantity;

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

    public Integer getDispensedQuantity() {
        return dispensedQuantity;
    }

    public void setDispensedQuantity(Integer dispensedQuantity) {
        this.dispensedQuantity = dispensedQuantity;
    }
}
