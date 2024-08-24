package com.example.uniMed.services.publics.about_us;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.repositories.publics.about_us.AboutUsRepository;
import com.example.uniMed.services.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AboutUsService {

    @Autowired
    private AboutUsRepository aboutUsRepository;

    @Autowired
    private FileService fileService;

    public List<AboutUs> getAllAboutUs() {
        return aboutUsRepository.findAll();
    }

    public Optional<AboutUs> getAboutUsById(Long id) {
        return aboutUsRepository.findById(id);
    }

    public AboutUs createAboutUs(AboutUs aboutUs) {
        return aboutUsRepository.save(aboutUs);
    }
    public AboutUs updateSingleAboutUs(Long id,String description) {
        AboutUs aboutUs = aboutUsRepository.findById(id).get();
        if (aboutUs == null) {
            return null;
        }
        aboutUs.setDescription(description);
        return aboutUsRepository.save(aboutUs);
    }

    public Optional<AboutUs> updateAboutUs(Long id, AboutUs aboutUsDetails) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUs.setDescription(aboutUsDetails.getDescription());
            aboutUs.setImageUrls(aboutUsDetails.getImageUrls());
            return aboutUsRepository.save(aboutUs);
        });
    }

    public boolean deleteAboutUs(Long id) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUsRepository.delete(aboutUs);
            return true;
        }).orElse(false);
    }

    public Optional<AboutUs> addImageToAboutUs(Long id, String imageUrl) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUs.getImageUrls().add(imageUrl);
            return aboutUsRepository.save(aboutUs);
        });
    }

    public Optional<AboutUs> getSingleAboutUs() {
        List<AboutUs> aboutUsList = aboutUsRepository.findAll();
        if (aboutUsList.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(aboutUsList.get(0));
    }
    public Optional<AboutUs> deleteImageFromAboutUs(Long id, String imageUrl) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUs.getImageUrls().remove(imageUrl);
            try {
                fileService.deleteFile(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
           
            return aboutUsRepository.save(aboutUs);
        });
    }
}