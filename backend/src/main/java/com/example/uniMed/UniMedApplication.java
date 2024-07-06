package com.example.uniMed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.uniMed.repositories")
public class UniMedApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniMedApplication.class, args);
	}

}
