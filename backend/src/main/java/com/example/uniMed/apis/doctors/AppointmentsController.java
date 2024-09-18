package com.example.uniMed.apis.doctors;



import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.DTOs.AppointmentsDTO1;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.services.doctors.AppointmentsService;


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
       
      
      


        return appointmentsService.createAppointment(appointmentDTO, appointmentDTO.getUserId());
    }

    @PostMapping("/{appointmentId}/prescribe")
    public Appointments prescribeMedicine(@PathVariable Integer appointmentId, @RequestBody PrescribeMedicineRequestDTO request) {
        System.out.println(request.getPrescribedMedicines());
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
    public List<AppointmentsDTO1> getAllAppointments() {
        return appointmentsService.getAllAppointments();
    }
}
