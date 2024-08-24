package com.example.uniMed.security;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class CustomInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Bypass token verification for GET requests
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        return true; // Continue with the next interceptor
    }
}