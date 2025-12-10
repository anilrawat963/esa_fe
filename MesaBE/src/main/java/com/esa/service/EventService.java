package com.esa.service;
import com.esa.dto.EventRequest;
import com.esa.model.Event;
import java.util.List;

public interface EventService {
    Event createEvent(EventRequest req, String username);
    void approveEvent(Long id, String approverRole);
    List<Event> getEvents(String username, String role, String group);
    Event updateEvent(Long id, EventRequest req, String requesterRole);
    void deleteEvent(Long id, String requesterRole);
}
