package com.esa.dto;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TaskRequest {
    private Integer eventID;
    private String assignedGroup;
    private String description;
    private Integer previousTask;
}
