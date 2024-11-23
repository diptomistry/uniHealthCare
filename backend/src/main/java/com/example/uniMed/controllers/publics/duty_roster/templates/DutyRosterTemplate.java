package com.example.uniMed.controllers.publics.duty_roster.templates;



import com.example.uniMed.models.dutyroster.DutyRoster;
import com.example.uniMed.services.publics.duty_roster.DutyRosterServices;

import java.util.List;

public abstract class DutyRosterTemplate {
    protected DutyRosterServices dutyRosterService;

    public DutyRosterTemplate(DutyRosterServices dutyRosterService) {
        this.dutyRosterService = dutyRosterService;
    }

    public final Object executeTemplate() {
        List<DutyRoster> data = fetchData();
        return transformData(data);
    }

    protected abstract List<DutyRoster> fetchData();
    protected abstract Object transformData(List<DutyRoster> data);
}