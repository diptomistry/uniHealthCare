package com.example.uniMed.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.uniMed.utils.TokenVerifierInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
      @Autowired
    private TokenVerifierInterceptor tokenVerifierInterceptor;
   

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       

        registry.addInterceptor(tokenVerifierInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**", "/api/departments/**", "/api/roles/**","/ws/chat/**","/api/blogs","/api/duty-roster/table","/api/medicines/all","/api/about-us/public/*"); // Exclude /auth/** paths
    }

  
}

