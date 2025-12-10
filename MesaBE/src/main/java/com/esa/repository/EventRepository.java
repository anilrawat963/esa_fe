package com.esa.repository;

import com.esa.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // Only valid fields
    List<Event> findByApprovedTrue();

    List<Event> findByCreatedBy(String created_by);

    // For filtering by group (string contains A,B,C)
    List<Event> findByAssignedToGroupsContaining(String group);

}
