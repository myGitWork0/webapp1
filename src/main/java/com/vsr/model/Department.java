package com.vsr.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * Created by lakshmanch on 5/10/15.
 */
@Entity
@Table(name = "department", uniqueConstraints = {@UniqueConstraint(name = "uk_dept_code", columnNames = {"dept_code"}), @UniqueConstraint(name = "uk_dept_name", columnNames = {"dept_name"})})
@Data
@EqualsAndHashCode(of = {"id"})
public class Department {

    @Id
    @GeneratedValue
    @Column(name = "dept_id", nullable = false, insertable = true, updatable = false)
    private int id;

    @Basic
    @Column(name = "dept_code", nullable = false, insertable = true, updatable = true, length = 16)
    private String shortCode;

    @Basic
    @Column(name = "dept_name", nullable = false, insertable = true, updatable = true, length = 64)
    private String name;

    @Basic
    @Column(name = "address", nullable = false, insertable = true, updatable = true, length = 256)
    private String address;

    @Basic
    @Column(name = "details", nullable = true, insertable = true, updatable = true, length = 256)
    private String details;
}
