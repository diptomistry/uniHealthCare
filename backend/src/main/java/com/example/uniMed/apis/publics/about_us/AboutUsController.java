package com.example.uniMed.apis.publics.about_us;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.services.FileService;
import com.example.uniMed.services.publics.about_us.AboutUsService;
import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse.File;

import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/api/about-us")
public class AboutUsController {

    @Autowired
    private AboutUsService aboutUsService;

    @Autowired
    private FileService fileService;

    @GetMapping
    public List<AboutUs> getAllAboutUs() {
        return aboutUsService.getAllAboutUs();
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<AboutUs> getAboutUsById(@PathVariable Long id) {
        Optional<AboutUs> aboutUs = aboutUsService.getAboutUsById(id);
        if (aboutUs.isPresent()) {
            AboutUs entity = aboutUs.get();
            AboutUs dto = new AboutUs(
                entity.getId(),
                entity.getDescription(),
                entity.getImageUrls() // Assuming getImageUrls() returns a List<String>
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/changeLogo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    
    public AboutUs postMethodName(@RequestPart("file") MultipartFile file) {
        return aboutUsService.changeLogo(file);
    }


    

    @PostMapping
    public AboutUs createAboutUs(@RequestBody AboutUs aboutUs) {
        return aboutUsService.createAboutUs(aboutUs);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AboutUs> updateAboutUs(@PathVariable Long id, @RequestPart("description") String description,@RequestPart("appName") String appName, @RequestPart("file") MultipartFile logoUrl) {
        AboutUs aboutUsDetails = new AboutUs();
        if (description != null) {
            aboutUsDetails.setDescription(description);
        }
        if (appName != null) {
            aboutUsDetails.setAppName(appName);
        }
        Optional<AboutUs> updatedAboutUs = aboutUsService.updateAboutUs(id, aboutUsDetails,logoUrl);
        if (updatedAboutUs.isPresent()) {
            return ResponseEntity.ok(updatedAboutUs.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAboutUs(@PathVariable Long id) {
        if (aboutUsService.deleteAboutUs(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
     @PostMapping("/update-single-about-us/{id}")
    public ResponseEntity<AboutUs> updateSingleAboutUs(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String description = payload.get("description");
        System.out.println("Description: " + description);
        AboutUs updatedAboutUs = aboutUsService.updateSingleAboutUs(id, description);
        if (updatedAboutUs != null) {
            return ResponseEntity.ok(updatedAboutUs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload-image/{id}")
    public ResponseEntity<AboutUs> addImage(@PathVariable Long id, @RequestPart("file") MultipartFile file) {
      
        return aboutUsService.addImageToAboutUs(id, file);
    }
 @PostMapping("/delete-image/{id}")
public ResponseEntity<AboutUs> deleteImage(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
    String imageUrl = requestBody.get("imageUrl");
    Optional<AboutUs> updatedAboutUs = aboutUsService.deleteImageFromAboutUs(id, imageUrl);
    if (updatedAboutUs.isPresent()) {
        return ResponseEntity.ok(updatedAboutUs.get());
    } else {
        return ResponseEntity.notFound().build();
    }
}
    
}