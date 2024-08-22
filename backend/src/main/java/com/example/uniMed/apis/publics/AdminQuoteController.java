package com.example.uniMed.apis.publics;



import com.example.uniMed.models.AdminQuote;
import com.example.uniMed.services.publics.AdminQuoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin-quotes")
public class AdminQuoteController {

    @Autowired
    private AdminQuoteService adminQuoteService;

    @GetMapping
    public List<AdminQuote> getAllAdminQuotes() {
        return adminQuoteService.getAllAdminQuotes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminQuote> getAdminQuoteById(@PathVariable Long id) {
        Optional<AdminQuote> adminQuote = adminQuoteService.getAdminQuoteById(id);
        if (adminQuote.isPresent()) {
            return ResponseEntity.ok(adminQuote.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public AdminQuote createAdminQuote(@RequestBody AdminQuote adminQuote) {
        return adminQuoteService.createAdminQuote(adminQuote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminQuote> updateAdminQuote(@PathVariable Long id, @RequestBody AdminQuote adminQuoteDetails) {
        Optional<AdminQuote> updatedAdminQuote = adminQuoteService.updateAdminQuote(id, adminQuoteDetails);
        if (updatedAdminQuote.isPresent()) {
            return ResponseEntity.ok(updatedAdminQuote.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminQuote(@PathVariable Long id) {
        if (adminQuoteService.deleteAdminQuote(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}