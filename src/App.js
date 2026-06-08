import React, { useState } from 'react';
import './index.css';

// ── NAVBAR ──────────────────────────────────────────────
function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setPage('home')}>
        Soleil Studio
      </div>
      <ul className="navbar-links">
        <li onClick={() => setPage('home')}>Home</li>
        <li onClick={() => setPage('services')}>Services</li>
        <li onClick={() => setPage('book')}>Book</li>
        <li onClick={() => setPage('contact')}>Contact</li>
      </ul>
    </nav>
  );
}

// ── HOME PAGE ────────────────────────────────────────────
function HomePage({ setPage, setCustomerType }) {
  return (
    <div className="hero">
      <h1>Welcome to Soleil Studio</h1>
      <div className="hero-buttons">
        <button
          className="btn-gold"
          onClick={() => { setCustomerType('returning'); setPage('book'); }}
        >
          Returning Customer
        </button>
        <button
          className="btn-outline"
          onClick={() => { setCustomerType('new'); setPage('services'); }}
        >
          New Customer
        </button>
      </div>
    </div>
  );
}

// ── SERVICES PAGE ────────────────────────────────────────
const serviceList = [
  {
    name: 'Haircut & Trim',
    price: 'From $45',
    description: 'A fresh cut tailored to your face shape and style goals.',
  },
  {
    name: 'Color & Highlights',
    price: 'From $120',
    description: 'Balayage, full color, or highlights to brighten your look.',
  },
  {
    name: 'Blowout & Styling',
    price: 'From $55',
    description: 'Smooth, voluminous blowouts for any occasion.',
  },
  {
    name: 'Consultation',
    price: 'Free',
    description: 'Not sure where to start? Chat with a stylist about your options.',
  },
];

function ServicesPage({ setPage, selectedService, setSelectedService }) {
  return (
    <div className="services-section">
      <h2>Our Services</h2>
      <div className="divider"></div>
      <p className="subtitle">Click a service to select it, then book your appointment.</p>
      <div className="services-grid">
        {serviceList.map((s) => (
          <div
            key={s.name}
            className={`service-card ${selectedService === s.name ? 'selected' : ''}`}
            onClick={() => setSelectedService(s.name)}
          >
            <h3>{s.name}</h3>
            <p className="price">{s.price}</p>
            <p className="description">{s.description}</p>
          </div>
        ))}
      </div>
      <button className="btn-gold" onClick={() => setPage('book')}>
        Book an Appointment
      </button>
    </div>
  );
}

// ── BOOKING PAGE ─────────────────────────────────────────
function BookingPage({ setPage, customerType, selectedService, setConfirmation }) {
  const [form, setForm] = useState({
    name: '',
    service: selectedService || '',
    stylist: '',
    date: '',
    time: '',
    notes: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name || !form.service || !form.stylist || !form.date || !form.time) {
      alert('Please fill in all required fields.');
      return;
    }
    setConfirmation(form);
    setPage('confirmation');
  }

  return (
    <div className="booking-section">
      <h2>Book Your Appointment</h2>
      <div className="divider"></div>

      <div className="form-group">
        <label>Your Name</label>
        <input
          name="name"
          placeholder="e.g. Jane Doe"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Select Service</label>
        <select name="service" value={form.service} onChange={handleChange}>
          <option value="">— Choose a service —</option>
          <option>Haircut & Trim</option>
          <option>Color & Highlights</option>
          <option>Blowout & Styling</option>
          <option>Consultation</option>
        </select>
      </div>

      <div className="form-group">
        <label>Select Stylist</label>
        <select name="stylist" value={form.stylist} onChange={handleChange}>
          <option value="">— Choose a stylist —</option>
          <option>Jessica</option>
          <option>Marie</option>
          <option>Chloe</option>
        </select>
      </div>

      <div className="form-group">
        <label>Select Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Select Time</label>
        <select name="time" value={form.time} onChange={handleChange}>
          <option value="">— Choose a time —</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>1:00 PM</option>
          <option>2:00 PM</option>
          <option>3:00 PM</option>
          <option>4:00 PM</option>
        </select>
      </div>

      {customerType === 'new' && (
        <div className="form-group">
          <label>Tell your stylist your inspiration (optional)</label>
          <textarea
            name="notes"
            placeholder="Describe your dream hair, share a photo idea, or tell us about your hair history..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>
      )}

      <button className="btn-gold" onClick={handleSubmit}>
        Confirm Booking
      </button>
    </div>
  );
}

// ── CONFIRMATION PAGE ────────────────────────────────────
function ConfirmationPage({ confirmation, setPage }) {
  return (
    <div className="confirmation-section">
      <h2>Appointment Confirmed!</h2>
      <p className="sub">We can't wait to see you at Soleil Studio.</p>
      <div className="confirmation-card">
        <h3>Service Information</h3>
        <p>Name: <span>{confirmation.name}</span></p>
        <p>Service: <span>{confirmation.service}</span></p>
        <p>Stylist: <span>{confirmation.stylist}</span></p>
        <p>Date: <span>{confirmation.date}</span></p>
        <p>Time: <span>{confirmation.time}</span></p>
        {confirmation.notes && (
          <p>Notes: <span>{confirmation.notes}</span></p>
        )}
        <p>Location: <span>123 Sesame Street, Ottawa, ON</span></p>
      </div>
      <button className="btn-gold" onClick={() => setPage('home')}>
        Return Home
      </button>
    </div>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────
function ContactPage() {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="divider"></div>
      <div className="contact-grid">
        <div className="contact-item">
          <h4>Location</h4>
          <p>123 Sesame Street<br />Ottawa, ON</p>
        </div>
        <div className="contact-item">
          <h4>Hours</h4>
          <p>
            Mon – Fri: 9am – 7pm<br />
            Saturday: 9am – 5pm<br />
            Sunday: Closed
          </p>
        </div>
        <div className="contact-item">
          <h4>Get in Touch</h4>
          <p>
            hello@soleilstudio.ca
          </p>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 Soleil Studio · 123 Sesame Street, Ottawa, ON ·{' '}
        <span>Designed by Somana Debnath</span>
      </p>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState('home');
  const [customerType, setCustomerType] = useState('new');
  const [selectedService, setSelectedService] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  function renderPage() {
    switch (page) {
      case 'home':
        return (
          <HomePage
            setPage={setPage}
            setCustomerType={setCustomerType}
          />
        );
      case 'services':
        return (
          <ServicesPage
            setPage={setPage}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        );
      case 'book':
        return (
          <BookingPage
            setPage={setPage}
            customerType={customerType}
            selectedService={selectedService}
            setConfirmation={setConfirmation}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationPage
            confirmation={confirmation}
            setPage={setPage}
          />
        );
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setPage} setCustomerType={setCustomerType} />;
    }
  }

  return (
    <div>
      <Navbar setPage={setPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
