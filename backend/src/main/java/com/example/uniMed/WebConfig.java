package com.example.uniMed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.uniMed.security.TokenVerifierInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
      @Autowired
    private TokenVerifierInterceptor tokenVerifierInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenVerifierInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**").excludePathPatterns("/api/departments/**").excludePathPatterns("/api/roles/**"); // Exclude /auth/** paths
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .exposedHeaders("Authorization")
            .allowCredentials(false)  // Changed this to false
            .maxAge(3600);
    }
}

