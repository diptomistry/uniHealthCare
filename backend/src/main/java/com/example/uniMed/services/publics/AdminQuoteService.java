package com.example.uniMed.services.publics;


import com.example.uniMed.models.AdminQuote;
import com.example.uniMed.repositories.publics.AdminQuoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminQuoteService {

    @Autowired
    private AdminQuoteRepository adminQuoteRepository;

    public List<AdminQuote> getAllAdminQuotes() {
        return adminQuoteRepository.findAll();
    }

    public Optional<AdminQuote> getAdminQuoteById(Long id) {
        return adminQuoteRepository.findById(id);
    }

    public AdminQuote createAdminQuote(AdminQuote adminQuote) {
        return adminQuoteRepository.save(adminQuote);
    }

    public Optional<AdminQuote> updateAdminQuote(Long id, AdminQuote adminQuoteDetails) {
        return adminQuoteRepository.findById(id).map(adminQuote -> {
            adminQuote.setQuote(adminQuoteDetails.getQuote());
            adminQuote.setUser(adminQuoteDetails.getUser());
            return adminQuoteRepository.save(adminQuote);
        });
    }

    public boolean deleteAdminQuote(Long id) {
        return adminQuoteRepository.findById(id).map(adminQuote -> {
            adminQuoteRepository.delete(adminQuote);
            return true;
        }).orElse(false);
    }
}