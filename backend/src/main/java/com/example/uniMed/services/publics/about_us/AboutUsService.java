package com.example.uniMed.services.publics.about_us;





import com.example.uniMed.models.AboutUs;
import com.example.uniMed.models.Image;
import com.example.uniMed.repositories.publics.about_us.AboutUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AboutUsService {

    @Autowired
    private AboutUsRepository aboutUsRepository;

    public List<AboutUs> getAllAboutUs() {
        return aboutUsRepository.findAll();
    }

    public Optional<AboutUs> getAboutUsById(Long id) {
        return aboutUsRepository.findById(id);
    }

    public AboutUs createAboutUs(AboutUs aboutUs) {
        return aboutUsRepository.save(aboutUs);
    }

    public Optional<AboutUs> updateAboutUs(Long id, AboutUs aboutUsDetails) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUs.setDescription(aboutUsDetails.getDescription());
            aboutUs.setImages(aboutUsDetails.getImages());
            return aboutUsRepository.save(aboutUs);
        });
    }

    public boolean deleteAboutUs(Long id) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUsRepository.delete(aboutUs);
            return true;
        }).orElse(false);
    }
      public Optional<AboutUs> addImageToAboutUs(Long id, Image image) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            aboutUs.getImages().add(image);
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
}