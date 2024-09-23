package com.example.uniMed.models;



import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogs")
public class Blog
 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 10000)
    private String description;
    private String image;
     @JsonProperty("isBlog")

    private boolean isBlog;

    private boolean isQoute;

    public Blog() {
    }

    public Blog(String title, String description, String image, boolean isBlog) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.isBlog = isBlog;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isBlog() {
        return isBlog;
    }

    public void setBlog(boolean blog) {
        isBlog = blog;
    }

    public boolean isQoute() {
        return isQoute;
    }

    public void setQoute(boolean isQoute) {
        this.isQoute = isQoute;
    }
}