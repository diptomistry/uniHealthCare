package com.example.uniMed.models;

import java.security.Permission;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class RolePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rolePermissionID;

    @ManyToOne
    @JoinColumn(name = "roleID")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "permissionID")
    private Permission permissions;
}