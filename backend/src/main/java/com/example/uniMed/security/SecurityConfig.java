package com.example.uniMed.security;
import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.grpc.netty.shaded.io.netty.handler.codec.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("SecurityConfig.securityFilterChain()");
        System.out.println(http.toString());
        http
            .cors().and()
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/**")
            )
            .authorizeHttpRequests((authorize) -> authorize
                .requestMatchers(HttpMethod.OPTIONS.name(), "/**").permitAll() 
                .requestMatchers("/websocket/**").permitAll()
                .requestMatchers("/api/auth/**", "/api/departments/**", "/api/roles/**", "/ws/chat/**", "/api/blogs", "/api/duty-roster/table", "/api/medicines/all","/websocket","api/about-us/public").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
      @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(false);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
