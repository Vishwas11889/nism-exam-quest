import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">NISM Prep</h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering financial professionals with world-class certification preparation. 
              Master your NISM certification with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>15K+ Success Stories</p>
              <p>78% Average Pass Rate</p>
              <p>450+ Practice Questions</p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/modules" className="text-gray-300 hover:text-primary transition-colors">
                  NISM Modules
                </Link>
              </li>
              <li>
                <Link to="/practice-tests" className="text-gray-300 hover:text-primary transition-colors">
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link to="/mock-exams" className="text-gray-300 hover:text-primary transition-colors">
                  Mock Exams
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-300 hover:text-primary transition-colors">
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link to="/study-guides" className="text-gray-300 hover:text-primary transition-colors">
                  Study Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support & Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-300 hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-gray-300 hover:text-primary transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <a href="mailto:support@nismprep.com" className="text-gray-300 hover:text-primary transition-colors">
                  support@nismprep.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-primary transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-300">
                  Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Business Hours</h5>
              <p className="text-sm text-gray-300">
                Monday - Friday: 9:00 AM - 7:00 PM IST<br />
                Saturday: 10:00 AM - 4:00 PM IST<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 NISM Prep Platform. All rights reserved. | Designed for financial professionals by experts.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/sitemap" className="text-gray-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-primary transition-colors">
                Accessibility
              </Link>
              <Link to="/careers" className="text-gray-400 hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="/press" className="text-gray-400 hover:text-primary transition-colors">
                Press
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;