package com.example.uniMed.repositories;

public interface EmailSender {
    void sendEmail(String to, String subject, String body);
}
