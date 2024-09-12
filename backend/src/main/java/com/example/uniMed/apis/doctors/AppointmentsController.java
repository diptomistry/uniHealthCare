package com.example.uniMed.apis.doctors;



import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.services.doctors.AppointmentsService;
import com.example.uniMed.services.doctors.PrescribedMedicineDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentsController {

    @Autowired
    private AppointmentsService appointmentsService;

    @PostMapping
    public Appointments createAppointment(@RequestBody AppointmentsDTO appointmentDTO) {
        Appointments appointment = new Appointments();
        appointment.setAppointmentDateTime(appointmentDTO.getAppointmentDateTime());
        appointment.setConcern(appointmentDTO.getConcern());
        appointment.setStatus(appointmentDTO.getStatus());
      
      


        return appointmentsService.createAppointment(appointment, appointmentDTO.getUserId());
    }

    @PostMapping("/{appointmentId}/prescribe")
    public Appointments prescribeMedicine(@PathVariable Integer appointmentId, @RequestBody PrescribeMedicineRequestDTO request) {
        return appointmentsService.prescribeMedicine(
            appointmentId,
            request.getPrescribedMedicines(),
            request.getDescription(),
            request.getDate(),
            request.getStatus(),
            request.getDoctorID(),
            request.getUserID()
        );
    }

    @PutMapping("/{appointmentId}/status")
    public Appointments updateAppointmentStatus(@PathVariable Integer appointmentId, @RequestParam String status) {
        return appointmentsService.updateAppointmentStatus(appointmentId, status);
    }
    @GetMapping("/{UserID}")
    public List<Appointments> getAppointmentsByUserID(@PathVariable Integer UserID) {
        return appointmentsService.getAppointmentsByUser(UserID);
    }
    @GetMapping("/all")
    public List<Appointments> getAllAppointments() {
        return appointmentsService.getAllAppointments();
    }
}
