package com.example.uniMed.services.role_based.doctors.patterns;

import java.util.Date;

import com.example.uniMed.models.Medicines;
import com.example.uniMed.models.User;

public class MedicinesBuilder {
    private String name;
    private boolean isOutside;
    private Date entryDate;
    private User addedBy;

    public MedicinesBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public MedicinesBuilder isOutside(boolean isOutside) {
        this.isOutside = isOutside;
        return this;
    }

    public MedicinesBuilder withEntryDate(Date entryDate) {
        this.entryDate = entryDate;
        return this;
    }

    public MedicinesBuilder addedBy(User addedBy) {
        this.addedBy = addedBy;
        return this;
    }

    public Medicines build() {
        Medicines medicine = new Medicines();
        medicine.setName(name);
        medicine.setIs_Outside(isOutside);
        medicine.setEntryDate(entryDate);
        medicine.setAddedBy(addedBy);
        return medicine;
    }
}