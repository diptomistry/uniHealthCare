package com.example.uniMed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.uniMed.security.CustomInterceptor;
import com.example.uniMed.security.TokenVerifierInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
      @Autowired
    private TokenVerifierInterceptor tokenVerifierInterceptor;
    @Autowired
    private CustomInterceptor customInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor)
                .addPathPatterns("/api/**");

        registry.addInterceptor(tokenVerifierInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**", "/api/departments/**", "/api/roles/**","/ws/chat/**","/api/blogs","/api/duty-roster/table"); // Exclude /auth/** paths
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .exposedHeaders("Authorization")
            .allowCredentials(false)
            .maxAge(3600);
    }
}

