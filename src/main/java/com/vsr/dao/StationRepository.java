package com.vsr.dao;

import com.vsr.model.Station;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StationRepository extends PagingAndSortingRepository<Station, Integer> {
}
