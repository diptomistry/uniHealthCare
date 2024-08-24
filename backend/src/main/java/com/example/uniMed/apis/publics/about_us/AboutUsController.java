package com.example.uniMed.apis.publics.about_us;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.services.FileService;
import com.example.uniMed.services.publics.about_us.AboutUsService;
import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import java.util.List;
import java.util.Map;
import java.util.Optional;


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

    @GetMapping("/{id}")
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

    @PostMapping
    public AboutUs createAboutUs(@RequestBody AboutUs aboutUs) {
        return aboutUsService.createAboutUs(aboutUs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AboutUs> updateAboutUs(@PathVariable Long id, @RequestBody AboutUs aboutUsDetails) {
        Optional<AboutUs> updatedAboutUs = aboutUsService.updateAboutUs(id, aboutUsDetails);
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
    public ResponseEntity<AboutUs> addImage(@PathVariable Long id, @RequestBody String imageUrl) {
        Optional<AboutUs> updatedAboutUs = aboutUsService.addImageToAboutUs(id, imageUrl);
        if (updatedAboutUs.isPresent()) {
            return ResponseEntity.ok(updatedAboutUs.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/delete-image/{id}")
   public ResponseEntity<AboutUs> deleteImage(@PathVariable Long id, @RequestBody String imageUrl) {
       Optional<AboutUs> updatedAboutUs = aboutUsService.deleteImageFromAboutUs(id, imageUrl);
       if (updatedAboutUs.isPresent()) {
           return ResponseEntity.ok(updatedAboutUs.get());
       } else {
           return ResponseEntity.notFound().build();
       }
   }
    
}