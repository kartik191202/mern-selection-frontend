// LandingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css";
import API_BASE from "../config/api";

//const API_BASE = "http://localhost:5000";

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchClients();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- AXIOS: FETCH PROJECTS ----------------
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`);
      const data = res.data;

      if (data && data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.warn("Unexpected projects response:", data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // ---------------- AXIOS: FETCH CLIENTS ----------------
  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/clients`);
      const data = res.data;

      if (data && data.success && Array.isArray(data.clients)) {
        setClients(data.clients);
      } else if (Array.isArray(data)) {
        setClients(data);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- AXIOS: CONTACT FORM POST ----------------
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/contact`, contactForm);
      const data = res.data;

      if (data && data.success) {
        alert("Contact form submitted successfully!");
        setContactForm({
          fullName: "",
          email: "",
          mobile: "",
          city: "",
        });
        setShowContactModal(false);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Error submitting form. Please try again.");
    }
  };

  // ---------------- AXIOS: NEWSLETTER POST ----------------
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/newsletter`, {
        email: newsletterEmail,
      });

      const data = res.data;

      if (data && data.success) {
        alert("Subscribed successfully!");
        setNewsletterEmail("");
      } else {
        alert("Subscription failed. Try again.");
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      alert("Error subscribing. Please try again.");
    }
  };

  const scrollToLearnMore = () => {
    const el = document.getElementById("learn-more");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="navbar">
            <div className="logo">Webees</div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); setShowProjectsModal(true); }}>Projects</a></li>
              <li><a href="#clients">Clients</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Transform Your Digital Vision Into Reality</h1>
              <p className="hero-description">
                We create stunning websites and digital experiences that drive results and captivate your audience
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => setShowProjectsModal(true)}>View Our Work</button>
                <button className="btn-secondary" onClick={scrollToLearnMore}>Learn More</button>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Get a Free Consultation</h2>
              <form onSubmit={handleContactSubmit} className="contact-form">
                <input type="text" name="fullName" placeholder="Full Name" value={contactForm.fullName} onChange={handleContactChange} required />
                <input type="email" name="email" placeholder="Enter Email Address" value={contactForm.email} onChange={handleContactChange} required />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={contactForm.mobile} onChange={handleContactChange} required />
                <input type="text" name="city" placeholder="Area, City" value={contactForm.city} onChange={handleContactChange} required />
                <button type="submit" className="submit-btn">Get Quick Quote</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">Explore our Webees of successful projects</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project._id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-image-wrapper">
                  <img src={`${API_BASE}/uploads/${project.image}`} alt={project.name} className="project-image" />
                  <div className="project-overlay"></div>
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <button className="read-more-btn">READ MORE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="clients-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Happy Clients</h2>
            <p className="section-subtitle">What our clients say about us</p>
          </div>

          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={client._id} className="client-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="client-image-wrapper">
                  <img src={`${API_BASE}/uploads/${client.image}`} alt={client.name} className="client-image" />
                </div>
                <p className="client-description">"{client.description}"</p>
                <h4 className="client-name">{client.name}</h4>
                <p className="client-designation">{client.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="learn-more" className="learn-more-section"></section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); setShowProjectsModal(true); }}>Projects</a>
              <a href="#clients">Clients</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>Contact</a>
            </nav>

            <div className="newsletter-form-wrapper">
              <h3>Subscribe Us</h3>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input type="email" placeholder="Enter Email Address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Webees. All rights reserved.</p>
        </div>
      </footer>

      {/* Projects Modal */}
      {showProjectsModal && (
        <div className="projects-modal" role="dialog" aria-modal="true">
          <div className="projects-modal-inner">
            <div className="projects-modal-header">
              <h2>Our Projects</h2>
              <button className="modal-close-btn" onClick={() => setShowProjectsModal(false)}>✕</button>
            </div>

            <div className="projects-modal-body">
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={project._id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="project-image-wrapper">
                      <img src={`${API_BASE}/uploads/${project.image}`} alt={project.name} className="project-image" />
                      <div className="project-overlay"></div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                      <button className="read-more-btn">READ MORE</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="popup-overlay" role="dialog" aria-modal="true">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowContactModal(false)}>✕</button>
            <h2>Get a Free Consultation</h2>
            <form onSubmit={handleContactSubmit} className="contact-form-modal">
              <input type="text" name="fullName" placeholder="Full Name" value={contactForm.fullName} onChange={handleContactChange} required />
              <input type="email" name="email" placeholder="Email" value={contactForm.email} onChange={handleContactChange} required />
              <input type="tel" name="mobile" placeholder="Mobile Number" value={contactForm.mobile} onChange={handleContactChange} required />
              <input type="text" name="city" placeholder="Area, City" value={contactForm.city} onChange={handleContactChange} required />
              <button type="submit" className="submit-btn">Get Quick Quote</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default LandingPage;
