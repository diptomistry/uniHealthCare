package com.example.uniMed.services.auth.factories;

import java.util.Map;

import com.example.uniMed.models.User;

public interface UserCreator {
    Object createUser(User user, Map<String, String> additionalFields);
}