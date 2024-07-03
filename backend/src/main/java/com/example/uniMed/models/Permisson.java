package com.example.uniMed.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Permisson {
      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer permissionID;

    private String permissionName;
}
