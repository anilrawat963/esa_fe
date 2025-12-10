package com.esa.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventRequest {

    private String eventTitle;        // EVT Title
    private String description;       // Description
    private String locationText;      // Location Text
    private Double lat;               // Latitude
    private Double lng;               // Longitude
    private String severity;          // Low, Medium, High
    private String assignedToGroups;  // A,B,C,D
    private String summary;
    
    // Summary
	public String getEventTitle() {
		return eventTitle;
	}
	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLocationText() {
		return locationText;
	}
	public void setLocationText(String locationText) {
		this.locationText = locationText;
	}
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	public Double getLng() {
		return lng;
	}
	public void setLng(Double lng) {
		this.lng = lng;
	}
	public String getSeverity() {
		return severity;
	}
	public void setSeverity(String severity) {
		this.severity = severity;
	}
	public String getAssignedToGroups() {
		return assignedToGroups;
	}
	public void setAssignedToGroups(String assignedToGroups) {
		this.assignedToGroups = assignedToGroups;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}



}
