package com.example.uniMed.services.publics.notice;

import com.example.uniMed.models.Notices;
import com.example.uniMed.repositories.publics.notice.NoticeRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepo noticeRepo;

    @Autowired
    public NoticeService(NoticeRepo noticeRepo) {
        this.noticeRepo = noticeRepo;
    }

    public ResponseEntity<Notices> createNotice(Notices notice) {
        Notices savedNotice = noticeRepo.save(notice);
        return new ResponseEntity<>(savedNotice, HttpStatus.CREATED);
    }

    public ResponseEntity<Notices> editNotice(Long id, Notices noticeDetails) {
       Notices notice = noticeRepo.findByNoticeID(id);
        if (notice != null) {
            notice.setTitle(noticeDetails.getTitle());
            notice.setDescription(noticeDetails.getDescription());
            notice.setDate(noticeDetails.getDate());
            Notices updatedNotice = noticeRepo.save(notice);
            return new ResponseEntity<>(updatedNotice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Notices>> getAllNotices() {
        List<Notices> notices = noticeRepo.findAll();
        return new ResponseEntity<>(notices, HttpStatus.OK);
    }

    public ResponseEntity<Notices> getNoticeById(Long id) {
        Notices notice = noticeRepo.findByNoticeID(id);
        return notice != null ? new ResponseEntity<>(notice, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> deleteNotice(Long id) {
      Notices notice = noticeRepo.findByNoticeID(id);
        if (notice != null) {
            noticeRepo.delete(notice);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}