package com.example.uniMed.models;

import jakarta.persistence.*;

@Entity
public class Role {
    @Id
    @Column(name = "roleid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(unique = true)
    private String roleName;
    public Role() {
        this.roleName = "student";
       
    }
    public Role(String roleName) {
        this.roleName = roleName;
    }
     public Role(Integer userRoleId) {
       
    }

   

    public Integer getRoleID() {
        return roleId;
    }

    public void setRoleID(Integer roleID) {
        this.roleId = roleID;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

  
    
}
