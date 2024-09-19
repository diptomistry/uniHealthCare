package com.example.uniMed.services.publics.about_us;

import com.example.uniMed.models.AboutUs;
import com.example.uniMed.repositories.publics.about_us.AboutUsRepository;
import com.example.uniMed.services.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public Optional<AboutUs> updateAboutUs(Long id, AboutUs aboutUsDetails, MultipartFile file) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            if (aboutUsDetails.getAppName() != null) {
                aboutUs.setAppName(aboutUsDetails.getAppName());
            }
            if (aboutUsDetails.getLogoUrl() != null) {
                aboutUs.setLogoUrl(aboutUsDetails.getLogoUrl());
            }
            if (aboutUsDetails.getDescription() != null) {
                aboutUs.setDescription(aboutUsDetails.getDescription());
            }
            if(file!=null){
                try {
                    String imageUrl = fileService.saveFile(file);
                    aboutUs.setLogoUrl(imageUrl);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            
            return aboutUsRepository.save(aboutUs);
        });
    }

    public boolean deleteAboutUs(Long id) {
        return aboutUsRepository.findById(id).map(aboutUs -> {
            
            aboutUsRepository.delete(aboutUs);
            return true;
        }).orElse(false);
    }

    public ResponseEntity<AboutUs> addImageToAboutUs(Long id, MultipartFile file) {
        
        try {
          String imageUrl=  fileService.saveFile(file);
          AboutUs aboutUs = aboutUsRepository.findById(id).get();
            aboutUs.getImageUrls().add(imageUrl);
            return ResponseEntity.ok(aboutUsRepository.save(aboutUs));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while adding image to about us, please try again");
        }
        

        
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
    public AboutUs changeLogo(MultipartFile file) {
        try{
        String imageUrl = fileService.saveFile(file);
        List<AboutUs> aboutUsList = aboutUsRepository.findAll();
        if (aboutUsList.isEmpty()) {
            AboutUs aboutUs = new AboutUs();
            aboutUs.setLogoUrl(imageUrl);
            return aboutUsRepository.save(aboutUs);
        }
        AboutUs aboutUs = aboutUsList.get(0);
        try {
            fileService.deleteFile(aboutUs.getLogoUrl());
        } catch (Exception e) {
            e.printStackTrace();
        }
        aboutUs.setLogoUrl(imageUrl);
        return aboutUsRepository.save(aboutUs);}
        catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error while changing logo");
        }
    }

}