package com.example.uniMed.apis.publics.notice;

import com.example.uniMed.models.Notices;
import com.example.uniMed.services.publics.notice.NoticeService;

import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public ResponseEntity<?> createNotice(@RequestBody Map<String,Object> payload) {
        String description= payload.get("description").toString();
        String title = payload.get("title").toString();
        Notices notice = new Notices();
        notice.setDescription(description);
        notice.setTitle(title);
        notice.setDate(LocalDate.now());
        
        return noticeService.createNotice(notice);
    }

   

    @PutMapping("/{id}")
    public ResponseEntity<?> editNotice(@PathVariable Long id, @RequestBody Notices notice) {
        return noticeService.editNotice(id, notice);
    }

    @GetMapping
    public ResponseEntity<List<Notices>> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoticeById(@PathVariable Long id) {
        return noticeService.getNoticeById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        return noticeService.deleteNotice(id);
    }
}