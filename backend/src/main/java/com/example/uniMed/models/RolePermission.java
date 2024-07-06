package com.example.uniMed.models;

import com.example.uniMed.models.Permission;

import jakarta.persistence.*;

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