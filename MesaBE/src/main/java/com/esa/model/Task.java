package com.esa.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "proj_tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskID;

    private Long eventID;

    @Column(name = "assigned_group")
    private String assignedGroup;

    @Column(name = "assigned_to_user")
    private String assignedToUser;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "date_assigned")
    private java.sql.Date dateAssigned;

    @Column(name = "time_assigned")
    private java.sql.Time timeAssigned;

    @Column(name = "previous_task")
    private Long previousTask;
}
