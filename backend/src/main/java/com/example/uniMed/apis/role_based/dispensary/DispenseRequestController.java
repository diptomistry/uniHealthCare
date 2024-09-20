package com.example.uniMed.apis.role_based.dispensary;


import com.example.uniMed.models.DTOs.DispenseRequestDTO;
import com.example.uniMed.models.dispensary.DispenseRequest;
import com.example.uniMed.services.role_based.dispensary.DispenseRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/dispense-requests")
public class DispenseRequestController {

    @Autowired
    private DispenseRequestService dispenseRequestService;

    @PostMapping
    public ResponseEntity<DispenseRequest> createDispenseRequest(@RequestBody DispenseRequestDTO requestDTO) {
        try {
            DispenseRequest createdRequest = dispenseRequestService.createDispenseRequest(requestDTO);
            return ResponseEntity.ok(createdRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DispenseRequest> getDispenseRequestById(@PathVariable Long id) {
        Optional<DispenseRequest> request = dispenseRequestService.getDispenseRequestById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
