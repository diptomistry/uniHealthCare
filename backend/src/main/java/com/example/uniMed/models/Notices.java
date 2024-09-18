package com.example.uniMed.models;
import jakarta.persistence.*;
import java.time.LocalDate;
// Notices entity
@Entity
@Table(name = "Notices")
public class Notices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeID;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    public int getNoticeID() {
        return noticeID;
    }

    public void setNoticeID(int noticeID) {
        this.noticeID = noticeID;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    public Notices(){
        
    }

   
   

    


    // Getters and Setters
}
