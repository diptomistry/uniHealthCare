package com.example.uniMed.repositories.publics.notice;


import com.example.uniMed.models.Notices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepo extends JpaRepository<Notices, Integer> {

    Notices findByNoticeID(Long noticeID);
    // You can define custom query methods here if needed
}