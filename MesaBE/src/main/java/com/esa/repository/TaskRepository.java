package com.esa.repository;

import com.esa.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedGroup(String assignedGroup);

    List<Task> findByAssignedToUser(String assignedToUser);

    List<Task> findByEventID(Long eventID);
}
