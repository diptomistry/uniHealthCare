package com.example.uniMed.services.role_based.doctors.patterns;

import com.example.uniMed.controllers.role_based.doctors.AppointmentsDTO;
import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.User;

public class AppointmentFactory {
    public static Appointments createAppointment(AppointmentsDTO appointmentDTO, User user) {
        Appointments appointment = new Appointments();
        appointment.setAppointmentDateTime(appointmentDTO.getAppointmentDateTime());
        appointment.setConcern(appointmentDTO.getConcern());
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setUser(user);
        return appointment;
    }
}
