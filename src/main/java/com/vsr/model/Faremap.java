package com.vsr.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/**
 * Created by lakshmanch on 5/10/15.
 */
@Entity
@Table(name = "faremap", uniqueConstraints = {@UniqueConstraint(name = "uk_fares_fromto", columnNames = {"from_stn_id", "to_stn_id"})})
@Data
@EqualsAndHashCode(of = {"id"})
public class Faremap {
    @Id
    @GeneratedValue
    @Column(name = "fare_id", nullable = false, insertable = false, updatable = false)
    private int id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_stn_id", insertable = true, updatable = true, nullable = false, referencedColumnName = "stn_id", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT, name = "fk_fares_fromstn"))
    private Station fromStation;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_stn_id", insertable = true, updatable = true, nullable = false, referencedColumnName = "stn_id", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT, name = "fk_fares_tostn"))
    private Station toStation;

    @Basic
    @Column(name = "fare", nullable = false, insertable = true, updatable = true, precision = 0)
    private float fare;
}
