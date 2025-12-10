# ESA Dashboard - Event Situational Awareness

A stunning, modern event management dashboard built with React, Vite, and ArcGIS, designed for emergency response and situational awareness with a beautiful clean light theme UI.

## Features

### Core Functionality
- **Event Management**: View, filter, and manage emergency events with gradient severity badges
- **ArcGIS Live Map**: Interactive mapping powered by ArcGIS with event markers and location tracking
- **Real-time Statistics**: Animated stat cards with icons tracking active events, deployed resources, and open alerts
- **Activity Timeline**: Monitor real-time system updates with smooth animations
- **Event Details Panel**: Comprehensive event information with glassmorphism effects and resource allocation
- **Create Event Modal**: Beautiful modal with modern form design for creating new events

### Modern UI/UX Design
- **Light Theme**: Clean, professional light background with subtle gradient overlays (#f8fafc → #e2e8f0)
- **Glassmorphism**: Frosted glass effects with backdrop blur throughout
- **Gradient Accents**: Beautiful purple-to-violet primary gradients (#667eea → #764ba2)
- **Smooth Animations**: Fade-in, slide-in, and hover transitions everywhere
- **Custom Scrollbars**: Themed scrollbars matching the color scheme
- **Hover Effects**: Interactive micro-animations with lift and shadow effects
- **Typography**: Inter font family for modern, clean text rendering
- **Color-coded Severity**: Vibrant gradient badges for Critical, High, Medium, and Low priorities
- **High Contrast**: Optimized text colors (#0f172a) for excellent readability
- **Professional Shadows**: Subtle elevation with modern shadow system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Top navigation bar
│   ├── EventsSidebar.jsx       # Events list with filtering
│   ├── LiveMap.jsx             # Map section with stats
│   ├── ActivityTimeline.jsx    # Real-time activity feed
│   ├── EventDetails.jsx        # Event detail panel
│   └── CreateEventModal.jsx    # Create event dialog
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## Technologies Used

- **React 18** - UI framework with hooks
- **Vite 5** - Lightning-fast build tool and dev server
- **ArcGIS Maps SDK (@arcgis/core)** - Professional mapping and GIS capabilities
- **CSS3** - Advanced styling with CSS variables, animations, and modern features
- **Inter Font** - Modern, clean typography
- **Glassmorphism** - Modern UI design trend with backdrop filters

## Development

The application is currently running on: **http://localhost:5175/**

Open your browser and navigate to the URL above to see the stunning modern dashboard in action!

## Design Reference

The dashboard design is based on the mockups in the `prompt/` folder, featuring:
- Clean, professional interface
- Color-coded severity badges (Critical, High, Medium, Low)
- Three-column layout for optimal information density
- Modal dialogs for creating new events

## Future Enhancements

- Integration with real mapping services (Google Maps, OpenStreetMap, ArcGIS)
- WebSocket support for real-time updates
- Backend API integration
- User authentication and authorization
- Advanced filtering and search capabilities
- Export functionality for reports and snapshots
