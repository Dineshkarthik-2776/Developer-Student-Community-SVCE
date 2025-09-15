import React, { useState } from 'react';
import '../css/EventCard.css';

import img1 from "../assets/BLUE_PRINTS_24-25/1.jpeg";

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
      name: "D-PREP 25-26",
      description: "A structured workshop series designed to strengthen students’ skills in Data Structures, Algorithms, Problem-Solving Strategies, and Analytical Thinking",
      fullDescription: "We organized a structured workshop series to strengthen students’ skills in Data Structures, Algorithms, Problem-Solving, and Analytical Thinking. The program began with an online DSA session by Mr. Suresh Kumar (Aug 11), followed by an offline worksheet-solving session (Aug 13) to reinforce fundamentals. A HackerRank-based competitive coding session (Aug 16) helped improve coding efficiency, while an offline workshop by Mr. Ashwin M (Aug 19) enhanced analytical thinking and quantitative aptitude through interactive problem-solving. The series concluded with a final online solve-along session (Aug 22) under Mr. Ashwin’s mentorship, bridging concepts with application and inspiring students to tackle challenges confidently.",
      type: "WORKSHOP",
      mode: "offline",
      participants: 70,
      date: "Aug 11-22",
      images: [
        "https://i.postimg.cc/ZR6DK6x4/1.jpg"
      ],
      allImages: [
        "https://i.postimg.cc/ZR6DK6x4/1.jpg",
        "https://i.postimg.cc/SRfS82kp/2.jpg",
        "https://i.postimg.cc/bYxN4MbF/3.jpg",
        "https://i.postimg.cc/GhbhRQx3/4.jpg",
      ],
      details: [
        { label: "Duration", value: "48 Hours" },
        { label: "Team Size", value: "1-Member" },
        { label: "Prize Pool", value: "$15,000" },
        { label: "Venue", value: "Placement cell" },
        { label: "Mentors", value: "Mr. Ashwin M & Mr. Suresh Kumar " }
      ]
    },{
      id: 2,
      name: "Blueprints 2025",
      description: "The ultimate industry-level hackathon empowering innovators to solve real-world challenges through technology, mentorship, creativity, collaboration, and impact.",
      fullDescription: "GDSC Blueprints 2025 was a multi-stage innovation odyssey hosted at SVCE, Tamil Nadu, bringing together over 200 student teams to compete in visionary tech problem-solving. Participants journeyed through abstract submissions, MVP development, and intensive mentorship, culminating in the acclaimed 24-hour offline Grand Finale Hackathon. Guided by seasoned industry leaders and SVCE alumni, teams received hands-on insights—from technical architecture refinement to product-market fit and business viability. Through detailed evaluations and interactive pitching, students evolved as industry-ready innovators, crafting robust, impactful solutions. The event ended with a grand valedictory ceremony, honoring the Top 5 winners and solidifying Blueprints as a launchpad for future technological leaders.",
      type: "HACKATHON",
      mode: "offline",
      participants: 1200,
      date: "Feb 16 - Mar 15",
      images: ["https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/blueprint2.jpg"],
      allImages: [
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/Picture3.png", 
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/Picture4.png", 
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/Picture8.png",
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/Picture5.png", 
      ],
      details: [
        { label: "Duration", value: "30 Days (Multi-Stage)" },
        { label: "Team Size", value: "4-6 Members" },
        { label: "Prize Pool", value: "₹1,00,000+ & MacBook, iPhone" },
        { label: "Venue", value: "Multipurpose Hall, SVCE" },
        { label: "Judges & Mentors", value: "SVCE Faculty, Alumni, Industry Leaders (AMD, PayPal, ServiceNow, Freshworks)" }
      ]
    },{
      id: 3,
      name: "GDSC DEVCON 24-25",
      description: "Collaborative product ideation and pitch development with practical mentorship, expert guidance, actionable insights, and constructive feedback.",
      fullDescription: "The GDSC DEVCON Event was a dynamic and collaborative initiative designed to inspire creativity and innovation among participants while fostering teamwork and practical problem-solving skills. Held on Saturday, October 19, 2024, the event targeted second & third-year students across all departments and provided a structured platform for ideation and pitch development. Participants, organized into teams of four, were assigned specific themes to stimulate critical thinking and explore innovative startup ideas",
      type: "IDEATHON",
      mode: "offline",
      participants: 70,
      date: "Oct 19",
      images: [
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/devcon1.jpg"
      ],
      allImages: [
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon1.jpg",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon2.jpg",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon3.jpg",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon4.jpg",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon5.jpg",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/devcon6.jpg"
      ],
      details: [
        { label: "Duration", value: "6 Hours" },
        { label: "Team Size", value: "4-Members" },
        { label: "Prize Pool", value: "$15,000" },
        { label: "Venue", value: "Video Hall, SVCE " }
      ]
    },{
      id: 4,
      name: "VISUALISING WEB DEVELOPMENT 24-25",
      description: "A structured workshop series designed to introduce second-year students from all departments to the fundamentals of web development through hands-on learning",
      fullDescription: "This workshop, 'Visualizing Web Development and Building Your First Website (Code-along),' was designed to introduce second-year students from all departments to the fundamentals of web development through hands-on learning. Held on Friday, September 27, 2024, the 3-hour event combined an interactive introductory session with a practical code-along exercise. The introductory session employed an activity-based learning approach, explaining core web development concepts such as front-end and back-end development, the internet's workings, and the relationship between HTML, CSS, and JavaScript.",
      type: "COMPE",
      mode: "offline",
      participants: 70,
      date: "Sep 27",
      images: [
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/visualweb.png"
      ],
      allImages: [
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/Vizweb1.jpeg",
        "https://yjyeolvrvtljjkvvzveb.supabase.co/storage/v1/object/public/images/vweb1.png",
        "https://lokgbhrmrwcrnfwfgnty.supabase.co/storage/v1/object/public/images/Vizweb1a.jpeg.jpg"
      ],
      details: [
        { label: "Duration", value: "3 Hours" },
        { label: "Team Size", value: "1-Member" },
        { label: "Venue", value: "Placement cell" },
        { label: "Mentors", value: "Facilitators" }
      ]
    },
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