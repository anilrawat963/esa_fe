package com.esa;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
public class EsAsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EsAsApplication.class, args);
	}

	 // create a default superadmin on startup if not exists
 
}