package com.vsr.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by lakshmanch on 5/10/15.
 */
@Entity
@Table(name = "invoice")
@Data
@EqualsAndHashCode(of = {"id"})
public class Invoice {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, insertable = false, updatable = false)
    private long id;

    @Basic
    @Column(name = "waybill_number", nullable = false, insertable = true, updatable = true, length = 16)
    private String waybillNumber;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_dept_id", insertable = true, updatable = true, nullable = false, referencedColumnName = "dept_id", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT, name = "fk_invc_frmdeptid"))
    private Department fromDepartment;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_dept_id", insertable = true, updatable = true, nullable = false, referencedColumnName = "dept_id", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT, name = "fk_invc_todeptid"))
    private Department toDepartment;

    @Basic
    @Column(name = "date", nullable = false, insertable = true, updatable = true)
    private Date date;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fare_id", insertable = true, updatable = true, nullable = false, referencedColumnName = "fare_id", foreignKey = @ForeignKey(value = ConstraintMode.CONSTRAINT, name = "fk_invc_faremapid"))
    private Faremap faremap;

    @Basic
    @Column(name = "dc_number", nullable = false, insertable = true, updatable = true, length = 32)
    private String dcNumber;

    @Basic
    @Column(name = "from_address", nullable = true, insertable = true, updatable = true, length = 256)
    private String fromAddress;

    @Basic
    @Column(name = "to_address", nullable = true, insertable = true, updatable = true, length = 256)
    private String toAddress;

    @Basic
    @Column(name = "goods_value", nullable = false, insertable = true, updatable = true, precision = 0)
    private float goodsValue;

    @Basic
    @Column(name = "package_count", nullable = false, insertable = true, updatable = true)
    private int packageCount;

    @Basic
    @Column(name = "description", nullable = true, insertable = true, updatable = true, length = 256)
    private String description;

    @Basic
    @Column(name = "weight", nullable = false, insertable = true, updatable = true, precision = 0)
    private float weight;

    @Basic
    @Column(name = "freight", nullable = false, insertable = true, updatable = true, precision = 0)
    private float freight;

    @Basic
    @Column(name = "value_surcharge", nullable = false, insertable = true, updatable = true, precision = 0)
    private float valueSurcharge;

    @Basic
    @Column(name = "doordel_charges", nullable = false, insertable = true, updatable = true, precision = 0)
    private float doordelCharges;

    @Basic
    @Column(name = "article_charges", nullable = false, insertable = true, updatable = true, precision = 0)
    private float articleCharges;

    @Basic
    @Column(name = "stat_charges", nullable = false, insertable = true, updatable = true, precision = 0)
    private float statCharges;

    @Basic
    @Column(name = "handling_charges", nullable = false, insertable = true, updatable = true, precision = 0)
    private float handlingCharges;

    @Basic
    @Column(name = "other_charges", nullable = false, insertable = true, updatable = true, precision = 0)
    private float otherCharges;
	
	@Basic
    @Column(name = "gst", nullable = true, insertable = true, updatable = true, precision = 0)
    private float gst;
	
    @Basic
    @Column(name = "total", nullable = false, insertable = true, updatable = true, precision = 0)
    private float total;
}
