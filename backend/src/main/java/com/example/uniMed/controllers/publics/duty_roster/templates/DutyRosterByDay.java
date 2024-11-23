package com.example.uniMed.controllers.publics.duty_roster.templates;



import com.example.uniMed.models.dutyroster.DutyRoster;
import com.example.uniMed.services.publics.duty_roster.DutyRosterServices;

import java.time.DayOfWeek;
import java.util.List;

public class DutyRosterByDay extends DutyRosterTemplate {
    private DayOfWeek dayOfWeek;

    public DutyRosterByDay(DutyRosterServices dutyRosterService, DayOfWeek dayOfWeek) {
        super(dutyRosterService);
        this.dayOfWeek = dayOfWeek;
    }

    @Override
    protected List<DutyRoster> fetchData() {
        return dutyRosterService.getDutyRosterForDay(dayOfWeek);
    }

    @Override
    protected Object transformData(List<DutyRoster> data) {
        return data; // Customize this as needed (e.g., convert to DTOs)
    }
}