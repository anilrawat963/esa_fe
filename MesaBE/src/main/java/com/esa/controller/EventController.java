package com.esa.controller;
import com.esa.dto.EventRequest;
import com.esa.model.Event;
import com.esa.service.EventService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService service;
    public EventController(EventService service) { this.service = service; }

    @PostMapping("/create")
    public Event create(@RequestBody EventRequest req, Authentication auth) {
        String username = auth != null ? auth.getName() : "anonymous";
        return service.createEvent(req, username);
    }

    @PutMapping("/approve/{id}")
    public void approve(@PathVariable Long id, Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        service.approveEvent(id, role);
    }

    @GetMapping("/all")
    public List<Event> all(Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        String username = auth.getName();
        String group = ""; // extract from token / or load user
        return service.getEvents(username, role, group);
    }

    @PutMapping("/update/{id}")
    public Event update(@PathVariable Long id, @RequestBody EventRequest req, Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        return service.updateEvent(id, req, role);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id, Authentication auth) {
        String role = auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        service.deleteEvent(id, role);
    }
}
