package com.example.uniMed.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${server.url}")
    private String serverUrl;

    public String saveFile(MultipartFile file) throws IOException {
        // Create the upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique filename
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Resolve the file path
        Path filePath = uploadPath.resolve(filename);

        // Save the file
        Files.copy(file.getInputStream(), filePath);

        // Return the full URL
        return serverUrl + "/uploads/" + filename;
    }
}
