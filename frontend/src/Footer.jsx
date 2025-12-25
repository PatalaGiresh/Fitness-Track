import React from 'react';
import './Footer.css'; // Optional CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      {/* Columns */}
      <div className="footer-columns">
        {/* Column 1: About */}
        <div className="footer-column">
          <h5 className="footer-heading">Fitness Track</h5>
          <p className="footer-text">
            Fitness Track is a smart fitness tracking application that helps
            users manage workouts, monitor progress, and maintain a healthy
            lifestyle.
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-column">
          <h5 className="footer-heading">Quick Links</h5>
          <p className="footer-link">Dashboard</p>
          <p className="footer-link">Workouts</p>
          <p className="footer-link">Diet Plan</p>
          <p className="footer-link">Progress</p>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-column">
          <h5 className="footer-heading">Contact Us</h5>
          <p className="footer-text">Email: support@fitnesstrack.com</p>
          <p className="footer-text">Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Fitness Track. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;