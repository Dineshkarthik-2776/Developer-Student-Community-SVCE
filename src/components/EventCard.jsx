import React, { useState } from 'react';
import '../css/EventCard.css';

const EventCard = ({ event, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = () => {
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
        </div>
        <div className="event-date">{event.date}</div>
      </div>
      
      <div className="hover-overlay">
        <div className="event-details">
          <h3>Click to View Details</h3>
          <p>🖱️ Click anywhere on the card</p>
          <p>🖼️ Click image to cycle through photos</p>
        </div>
      </div>
    </div>
  );
};

const EventPopup = ({ event, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!event) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % event.allImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + event.allImages.length) % event.allImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`popup-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-header">
          <h2 className="popup-title">{event.name}</h2>
          <span className="popup-type">{event.type}</span>
        </div>

          <div className="image-gallery">
            <h3 className="gallery-title">Event Gallery</h3>
    
            {/* Desktop Grid View */}
            <div className="gallery-grid">
              {event.allImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${event.name} - Gallery ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
            
            {/* Mobile Slider View */}
            <div className="gallery-slider">
              <div className="gallery-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {event.allImages.map((image, index) => (
                  <div key={index} className="gallery-slide">
                    <img src={image} alt={`${event.name} - Gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
              
              <button className="gallery-nav prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="gallery-nav next" onClick={nextSlide}>
                ›
              </button>
              
              <div className="gallery-dots">
                {event.allImages.map((_, index) => (
                  <div
                    key={index}
                    className={`gallery-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        
        <div className="popup-body">
          <p className="popup-description">{event.fullDescription}</p>
          
          <div className="popup-details">
            {event.details.map((detail, index) => (
              <div key={index} className="popup-detail-item">
                <div className="popup-detail-label">{detail.label}</div>
                <div className="popup-detail-value">{detail.value}</div>
              </div>
            ))}
          </div>
        

        </div>
      </div>
    </div>
  );
};

const EventsDisplay = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Sample event data with 6 images each
  const events = [
    {
      id: 1,
      name: "Code the Future 2024",
      description: "48-hour coding marathon to build innovative solutions for real-world problems. Join developers worldwide to create something amazing.",
      fullDescription: "Code the Future 2024 is our flagship hackathon event bringing together the brightest minds in technology. Over 48 intense hours, participants will work in teams to develop innovative solutions to real-world problems across various domains including healthcare, education, sustainability, and fintech. The event features mentorship from industry experts, workshops on cutting-edge technologies, and networking opportunities with potential employers and investors. With a substantial prize pool and the chance to showcase your skills, this hackathon is the perfect platform to turn your ideas into reality.",
      type: "Hackathon",
      mode: "offline",
      participants: 250,
      views: "4.2K",
      date: "Nov 15-17",
      images: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop"
      ],
      allImages: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "48 Hours" },
        { label: "Team Size", value: "2-4 Members" },
        { label: "Prize Pool", value: "$15,000" },
        { label: "Venue", value: "Tech Campus" },
        { label: "Registration", value: "Open Now" },
        { label: "Mentors", value: "20+ Industry Experts" }
      ]
    },
    {
      id: 2,
      name: "AI Workshop Series",
      description: "Learn the fundamentals of artificial intelligence and machine learning through hands-on workshops and expert sessions.",
      fullDescription: "Our comprehensive AI Workshop Series is designed to take you from beginner to practitioner in the exciting world of artificial intelligence and machine learning. The workshop spans four days with intensive hands-on sessions covering neural networks, deep learning, computer vision, natural language processing, and ethical AI. Led by industry experts and researchers, each session combines theoretical foundations with practical implementation using popular frameworks like TensorFlow and PyTorch. Participants will work on real datasets and build their own AI models by the end of the series.",
      type: "Workshop",
      mode: "online",
      participants: 180,
      views: "2.8K",
      date: "Dec 5-8",
      images: [
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop"
      ],
      allImages: [
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "4 Days" },
        { label: "Sessions", value: "12 Hours" },
        { label: "Certificates", value: "Provided" },
        { label: "Level", value: "Beginner to Intermediate" },
        { label: "Platform", value: "Zoom + Discord" },
        { label: "Materials", value: "Datasets & Code Included" }
      ]
    },
    {
      id: 3,
      name: "Tech Talk: Future of Web3",
      description: "Industry experts discuss the latest trends in blockchain technology, cryptocurrency, and decentralized applications.",
      fullDescription: "Join us for an enlightening evening discussing the revolutionary impact of Web3 technologies on the future of the internet. Our panel of blockchain experts, cryptocurrency researchers, and DeFi pioneers will explore the latest developments in decentralized finance, non-fungible tokens, and decentralized autonomous organizations. The session will cover both the technological innovations and the socio-economic implications of this paradigm shift, followed by an interactive Q&A session and networking opportunities with fellow blockchain enthusiasts.",
      type: "Tech Talk",
      mode: "offline",
      participants: 95,
      views: "1.5K",
      date: "Dec 12",
      images: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop"
      ],
      allImages: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Hours" },
        { label: "Speakers", value: "5 Industry Experts" },
        { label: "Topics", value: "DeFi, NFTs, DAOs" },
        { label: "Venue", value: "Main Auditorium" },
        { label: "Networking", value: "Post-Event Mixer" },
        { label: "Refreshments", value: "Included" }
      ]
    },
    {
      id: 4,
      name: "Mobile App Challenge",
      description: "Design and develop mobile applications that solve campus problems. Perfect opportunity to showcase your creativity and technical skills.",
      fullDescription: "The Mobile App Challenge is a unique opportunity for students to identify and solve real problems within our campus community through innovative mobile applications. Teams will have three days to conceptualize, design, and develop functional mobile apps for both iOS and Android platforms. The challenge emphasizes user experience design, technical implementation, and practical utility. Participants will receive mentorship from mobile development professionals, access to development resources, and the chance to have their apps featured in the campus app store.",
      type: "Competition",
      mode: "offline",
      participants: 120,
      views: "3.1K",
      date: "Jan 20-22",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop"
      ],
      allImages: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Days" },
        { label: "Team Size", value: "3-5 Members" },
        { label: "Prize Pool", value: "$8,000" },
        { label: "Platforms", value: "iOS & Android" },
        { label: "Judging", value: "Industry Experts" },
        { label: "Resources", value: "Dev Kits Provided" }
      ]
    },
    {
      id: 5,
      name: "Open Source Contribute Day",
      description: "Contribute to popular open source projects and learn collaborative development practices with experienced maintainers.",
      fullDescription: "Open Source Contribute Day is designed to introduce students to the world of collaborative software development through meaningful contributions to popular open source projects. Participants will work alongside experienced maintainers and contributors to understand project structures, coding standards, and contribution workflows. The event covers Git/GitHub best practices, code review processes, documentation writing, and community engagement. By the end of the day, every participant will have made at least one meaningful contribution to a real open source project.",
      type: "Community",
      mode: "online",
      participants: 85,
      views: "1.9K",
      date: "Feb 3",
      images: [
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop"
      ],
      allImages: [
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "8 Hours" },
        { label: "Projects", value: "15+ Repositories" },
        { label: "Mentors", value: "Available Throughout" },
        { label: "Platform", value: "Discord + GitHub" },
        { label: "Swag", value: "GitHub Merchandise" },
        { label: "Certificate", value: "Contribution Badge" }
      ]
    },
    {
      id: 6,
      name: "Cybersecurity Boot Camp",
      description: "Intensive training on ethical hacking, penetration testing, and security best practices for modern applications.",
      fullDescription: "Our Cybersecurity Boot Camp offers comprehensive hands-on training in ethical hacking and cybersecurity practices. Over three intensive days, participants will learn penetration testing methodologies, vulnerability assessment techniques, secure coding practices, and incident response procedures. The curriculum covers network security, web application security, cryptography, and digital forensics. Using industry-standard tools like Kali Linux, Metasploit, and Wireshark, participants will gain practical experience in identifying and mitigating security threats in controlled environments.",
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
      allImages: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop"
      ],
      details: [
        { label: "Duration", value: "3 Days" },
        { label: "Hands-on Labs", value: "25+ Exercises" },
        { label: "Certificate", value: "CEH Preparation" },
        { label: "Venue", value: "Security Lab" },
        { label: "Tools", value: "Kali Linux Suite" },
        { label: "Career Support", value: "Job Placement Assistance" }
      ]
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
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

      <EventPopup
        event={selectedEvent}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
};

export default EventsDisplay;