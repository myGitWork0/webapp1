package com.vsr.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * Created by lakshmanch on 5/10/15.
 */
@Entity
@Table(name = "station", uniqueConstraints = {@UniqueConstraint(name = "uk_stn_code", columnNames = {"stn_code"}), @UniqueConstraint(name = "uk_stn_name", columnNames = {"stn_name"})})
@Data
@EqualsAndHashCode(of = {"id"})
public class Station {
    @Id
    @GeneratedValue
    @Column(name = "stn_id", nullable = false, insertable = false, updatable = false)
    private int id;

    @Basic
    @Column(name = "stn_code", nullable = false, insertable = true, updatable = true, length = 6)
    private String shortCode;

    @Basic
    @Column(name = "stn_name", nullable = false, insertable = true, updatable = true, length = 32)
    private String stationName;

    @Basic
    @Column(name = "district", nullable = false, insertable = true, updatable = true, length = 32)
    private String district;

    @Basic
    @Column(name = "state", nullable = false, insertable = true, updatable = true, length = 32)
    private String state;
}
