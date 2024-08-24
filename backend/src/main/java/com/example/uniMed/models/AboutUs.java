package com.example.uniMed.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "about_us")
public class AboutUs {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
   
    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "about_us_images", joinColumns = @JoinColumn(name = "about_us_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    public AboutUs() {
    }

    public AboutUs(Long id, String description, List<String> imageUrls) {
        this.id = id;
        this.description = description;
        this.imageUrls = imageUrls;
    }
    public AboutUs(String description, List<String> imageUrls) {
        this.description = description;
        this.imageUrls = imageUrls;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}