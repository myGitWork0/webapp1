package com.vsr.dao;

import com.vsr.model.Faremap;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "fares", path = "fares", excerptProjection = FareDetails.class)
public interface FaremapRepository extends PagingAndSortingRepository<Faremap, Integer> {
}
