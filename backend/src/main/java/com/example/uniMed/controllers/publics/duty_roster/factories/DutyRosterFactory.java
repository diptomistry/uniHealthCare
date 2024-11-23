package com.example.uniMed.controllers.publics.duty_roster.factories;



import com.example.uniMed.models.dutyroster.DutyRoster;

import java.time.DayOfWeek;

public class DutyRosterFactory {
    public static DutyRoster createDutyRoster(DayOfWeek day, String slotTime) {
        DutyRoster dutyRoster = new DutyRoster();
        dutyRoster.setDayOfWeek(day);
        dutyRoster.setSlotTime(slotTime);
        return dutyRoster;
    }
}