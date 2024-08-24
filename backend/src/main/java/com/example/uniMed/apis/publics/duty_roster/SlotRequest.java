package com.example.uniMed.apis.publics.duty_roster;
import java.util.List;
public class SlotRequest {
    private String timeSlot;
    private Long dayOfWeekId;
    private List<Long> doctorIds;
    public String getTimeSlot() {
        return timeSlot;
    }
    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
    public Long getDayOfWeekId() {
        return dayOfWeekId;
    }
    public void setDayOfWeekId(Long dayOfWeekId) {
        this.dayOfWeekId = dayOfWeekId;
    }
    public List<Long> getDoctorIds() {
        return doctorIds;
    }
    public void setDoctorIds(List<Long> doctorIds) {
        this.doctorIds = doctorIds;
    }
    

    // Getters and Setters
}