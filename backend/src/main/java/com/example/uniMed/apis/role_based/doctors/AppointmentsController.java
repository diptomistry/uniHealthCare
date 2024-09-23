package com.example.uniMed.apis.role_based.doctors;

import com.example.uniMed.models.Appointments;
import com.example.uniMed.models.DTOs.AppointmentsDTO1;
import com.example.uniMed.models.medicine.PrescribedMedicine;
import com.example.uniMed.services.role_based.doctors.AppointmentsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
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
    public Appointments prescribeMedicine(@PathVariable Integer appointmentId,
            @RequestBody PrescribeMedicineRequestDTO request) {
        System.out.println(request.getPrescribedMedicines());
        return appointmentsService.prescribeMedicine(
                appointmentId,
                request.getPrescribedMedicines(),
                request.getDescription(),
                request.getDate(),
                request.getStatus(),
                request.getDoctorID(),
                request.getUserID());
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
    public Page<Appointments> getAllAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Appointments> appointments = appointmentsService.getAllAppointments(pageable).getContent();
        List<AppointmentsDTO1> appointmentsDTOs = new ArrayList<>();
        for (Appointments appointment : appointments) {
            AppointmentsDTO1 appointmentsDTO = new AppointmentsDTO1();
          
        }
        return appointmentsService.getAllAppointments(pageable);
    }
}
