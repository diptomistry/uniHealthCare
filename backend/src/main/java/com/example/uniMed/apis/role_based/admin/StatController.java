package com.example.uniMed.apis.role_based.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.uniMed.services.role_based.admin.StatService;

@RestController
public class StatController {

    @Autowired
    private StatService statService;

    @GetMapping("/api/stats")
    public Map<String, Object> getStatistics() {
        return statService.getStatistics();
    }
}