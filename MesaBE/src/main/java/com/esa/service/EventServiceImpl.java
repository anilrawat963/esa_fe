package com.esa.service;

import com.esa.dto.EventRequest;
import com.esa.model.Event;
import com.esa.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository repo;

    public EventServiceImpl(EventRepository repo) {
        this.repo = repo;
    }

    @Override
    public Event createEvent(EventRequest req, String username) {

        Event e = new Event();
        e.setEventTitle(req.getEventTitle());
        e.setDescription(req.getDescription());
        e.setLocationText(req.getLocationText());   // ✔ FIXED
        e.setLatitude(req.getLat());
        e.setLongitude(req.getLng());
        e.setSeverity(req.getSeverity());
        e.setAssignedToGroups(req.getAssignedToGroups()); // ✔ FIXED
        e.setSummary(req.getSummary());
        e.setApproved(false);
        e.setCreatedBy(username);  // ✔ FIXED

        return repo.save(e);
    }

    @Override
    public void approveEvent(Long id, String approverRole) {

        Event e = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (!approverRole.equals("ADMIN") && !approverRole.equals("SUPER_ADMIN")) {
            throw new RuntimeException("Not authorized");
        }

        e.setApproved(true);
        repo.save(e);
    }

    @Override
    public List<Event> getEvents(String username, String role, String group) {

        if (role.equals("SUPER_ADMIN")) {
            return repo.findAll();
        }

        if (role.equals("ADMIN")) {
            return repo.findAll();
        }

        // USER
        List<Event> approved = repo.findByApprovedTrue();
        List<Event> result = new ArrayList<>();

        for (Event e : approved) {

            if (e.getAssignedToGroups() != null &&  // ✔ FIXED
                e.getAssignedToGroups().contains(group)) {
                result.add(e);
            }

            else if (username.equals(e.getCreatedBy())) { // ✔ FIXED
                result.add(e);
            }
        }

        return result;
    }

    @Override
    public Event updateEvent(Long id, EventRequest req, String requesterRole) {

        Event e = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (requesterRole.equals("USER")) {
            throw new RuntimeException("User cannot modify events");
        }

        e.setEventTitle(req.getEventTitle());
        e.setDescription(req.getDescription());
        e.setLocationText(req.getLocationText());  // ✔ FIXED
        e.setLatitude(req.getLat());
        e.setLongitude(req.getLng());
        e.setSeverity(req.getSeverity());
        e.setAssignedToGroups(req.getAssignedToGroups()); // ✔ FIXED
        e.setSummary(req.getSummary());

        return repo.save(e);
    }

    @Override
    public void deleteEvent(Long id, String requesterRole) {

        if (requesterRole.equals("USER")) {
            throw new RuntimeException("User cannot delete events");
        }

        repo.deleteById(id);
    }
}
