package com.vsr.dao;

import com.vsr.model.Department;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DepartmentRepository extends PagingAndSortingRepository<Department, Integer> {
}
