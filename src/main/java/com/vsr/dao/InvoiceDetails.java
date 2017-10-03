package com.vsr.dao;

import com.vsr.model.Department;
import com.vsr.model.Faremap;
import com.vsr.model.Invoice;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Created by lakshmanch on 14/10/15.
 */
@Projection(name = "invoice_details", types = {Invoice.class})
public interface InvoiceDetails {
    public long getId();

    public String getWaybillNumber();

    public Department getFromDepartment();

    public Department getToDepartment();

    public Date getDate();

    public Faremap getFaremap();

    public String getDcNumber();

    public String getFromAddress();

    public String getToAddress();

    public float getGoodsValue();

    public int getPackageCount();

    public String getDescription();

    public float getWeight();

    public float getFreight();

    public float getValueSurcharge();

    public float getDoordelCharges();

    public float getArticleCharges();

    public float getStatCharges();

    public float getHandlingCharges();

    public float getOtherCharges();
	
	public float getGst();

    public float getTotal();
}
