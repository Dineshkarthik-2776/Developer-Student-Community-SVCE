import React, { useState } from 'react';
import '../css/EventCard.css';

const EventCard = ({ event, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
    onClick?.(event);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="card-header">
        <img
          src={event.images[currentImageIndex]}
          alt={`${event.name} - Image ${currentImageIndex + 1}`}
          className="event-image"
        />
        
        <div className="event-type">{event.type}</div>
        
        <div className={`event-mode ${event.mode}`}>
          {event.mode === 'online' ? '💻' : '📍'}
        </div>

        <div className="image-counter">
          {currentImageIndex + 1}/{event.images.length}
        </div>

        <div className="card-decorative"></div>
      </div>
      
      <div className="card-body">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-description">{event.description}</p>
      </div>
      
      <div className="card-footer">
        <div className="event-stats">
          <div className="stat">
            <span>👥</span>
            <span>{event.participants}</span>
          </div>
          <div className="stat">
            <span>👁</span>
            <span>{event.views}</span>
          </div>
        </div>
        <div className="event-date">{event.date}</div>
      </div>
      
      <div className="hover-overlay">
        <div className="event-details">
          <h3>Event Details</h3>
          {event.details.map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-label">{detail.label}:</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EventsDisplay = () => {
  // Sample event data - replace with your actual data
  const events = [
    {
      id: 1,
      name: "Code the Future 2024",
      description: "48-hour coding marathon to build innovative solutions for real-world problems. Join developers worldwide to create something amazing.",
      type: "Hackathon",
      mode: "offline",
      participants: 250,
      views: "4.2K",
      date: "Nov 15-17",
      images: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "48 Hours" },
        { label: "Team Size", value: "2-4 Members" },
        { label: "Prize Pool", value: "$15,000" },
        { label: "Venue", value: "Tech Campus" },
        { label: "Registration", value: "Open Now" }
      ]
    },
    {
      id: 2,
      name: "AI Workshop Series",
      description: "Learn the fundamentals of artificial intelligence and machine learning through hands-on workshops and expert sessions.",
      type: "Workshop",
      mode: "online",
      participants: 180,
      views: "2.8K",
      date: "Dec 5-8",
      images: [
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "4 Days" },
        { label: "Sessions", value: "12 Hours" },
        { label: "Certificates", value: "Provided" },
        { label: "Level", value: "Beginner" },
        { label: "Platform", value: "Zoom" }
      ]
    },
    {
      id: 3,
      name: "Tech Talk: Future of Web3",
      description: "Industry experts discuss the latest trends in blockchain technology, cryptocurrency, and decentralized applications.",
      type: "Tech Talk",
      mode: "offline",
      participants: 95,
      views: "1.5K",
      date: "Dec 12",
      images: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Hours" },
        { label: "Speakers", value: "5 Experts" },
        { label: "Topics", value: "DeFi, NFTs, DAOs" },
        { label: "Venue", value: "Main Auditorium" },
        { label: "Networking", value: "Included" }
      ]
    },
    {
      id: 4,
      name: "Mobile App Challenge",
      description: "Design and develop mobile applications that solve campus problems. Perfect opportunity to showcase your creativity and technical skills.",
      type: "Competition",
      mode: "offline",
      participants: 120,
      views: "3.1K",
      date: "Jan 20-22",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Days" },
        { label: "Team Size", value: "3-5 Members" },
        { label: "Prize Pool", value: "$8,000" },
        { label: "Platforms", value: "iOS & Android" },
        { label: "Judging", value: "Industry Experts" }
      ]
    },
    {
      id: 5,
      name: "Open Source Contribute Day",
      description: "Contribute to popular open source projects and learn collaborative development practices with experienced maintainers.",
      type: "Community",
      mode: "online",
      participants: 85,
      views: "1.9K",
      date: "Feb 3",
      images: [
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "8 Hours" },
        { label: "Projects", value: "15+ Repos" },
        { label: "Mentors", value: "Available" },
        { label: "Platform", value: "Discord" },
        { label: "Swag", value: "GitHub Merch" }
      ]
    },
    {
      id: 6,
      name: "Cybersecurity Boot Camp",
      description: "Intensive training on ethical hacking, penetration testing, and security best practices for modern applications.",
      type: "Boot Camp",
      mode: "offline",
      participants: 75,
      views: "2.3K",
      date: "Feb 15-17",
      images: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Days" },
        { label: "Hands-on Labs", value: "20+ Exercises" },
        { label: "Certificate", value: "CEH Preparation" },
        { label: "Venue", value: "Security Lab" },
        { label: "Tools", value: "Kali Linux" }
      ]
    }
  ];

  const handleEventClick = (event) => {
    console.log('Event clicked:', event.name);
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="events-title">
          Club <span className="highlight">Events</span>
        </h1>
        <p className="events-subtitle">
          Discover amazing events, workshops, and competitions organized by our tech community
        </p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={handleEventClick}
          />
        ))}
      </div>

      <div className="load-more-container">
        <button className="load-more-btn">
          Load More Events
        </button>
      </div>
    </div>
  );
};

export default EventsDisplay;