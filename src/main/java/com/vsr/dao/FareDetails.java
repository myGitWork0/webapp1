package com.vsr.dao;

import com.vsr.model.Faremap;
import com.vsr.model.Station;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by lakshmanch on 14/10/15.
 */
@Projection(name = "fare_details", types = {Faremap.class})
public interface FareDetails {
    int getId();

    Station getFromStation();

    Station getToStation();

    float getFare();
}
