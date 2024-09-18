package com.example.uniMed.apis.role_based.dispensary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.uniMed.models.DTOs.MedicineRequestDTO;
import com.example.uniMed.models.dispensary.MedicineRequest;
import com.example.uniMed.services.role_based.dispensary.MedicineRequestService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicine-requests")
public class MedicineRequestController {

    @Autowired
    private MedicineRequestService medicineRequestService;

    @PostMapping
    public ResponseEntity<MedicineRequest> createRequest(@RequestBody MedicineRequestDTO request) {
        MedicineRequest createdRequest = medicineRequestService.createRequest(request);
        return ResponseEntity.ok(createdRequest);
    }

    @GetMapping
    public ResponseEntity<List<MedicineRequest>> getAllRequests() {
        List<MedicineRequest> requests = medicineRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineRequest> getRequestById(@PathVariable Long id) {
        Optional<MedicineRequest> request = medicineRequestService.getRequestById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MedicineRequest> updateRequestStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        MedicineRequest updatedRequest = medicineRequestService.updateRequestStatus(id, status);
        if (updatedRequest != null) {
            return ResponseEntity.ok(updatedRequest);
        }
        return ResponseEntity.notFound().build();
    }
}
