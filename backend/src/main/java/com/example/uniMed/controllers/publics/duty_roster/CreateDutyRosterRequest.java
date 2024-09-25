package com.example.uniMed.controllers.publics.duty_roster;
import java.time.DayOfWeek;

import org.checkerframework.checker.units.qual.min;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;

public class CreateDutyRosterRequest {


  
    @NotNull
    private String slotTime;

    public String getSlotTime() {
        return slotTime;
    }
    public void setSlotTime(String slotTime) {
        this.slotTime = slotTime;
    }

   

  

    // getters and setters
}