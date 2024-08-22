package com.example.uniMed.apis.publics.about_us;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.models.Image;
import com.example.uniMed.services.publics.about_us.AboutUsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/about-us")
public class AboutUsController {

    @Autowired
    private AboutUsService aboutUsService;

    @GetMapping
    public List<AboutUs> getAllAboutUs() {
        return aboutUsService.getAllAboutUs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AboutUs> getAboutUsById(@PathVariable Long id) {
        Optional<AboutUs> aboutUs = aboutUsService.getAboutUsById(id);
        if (aboutUs.isPresent()) {
            return ResponseEntity.ok(aboutUs.get());
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
   @PostMapping("/upload-image/{id}")
    public ResponseEntity<AboutUs> addImage(@PathVariable Long id, @RequestBody Image image) {
        Optional<AboutUs> updatedAboutUs = aboutUsService.addImageToAboutUs(id, image);
        if (updatedAboutUs.isPresent()) {
            return ResponseEntity.ok(updatedAboutUs.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}