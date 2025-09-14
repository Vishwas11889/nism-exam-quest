import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-lg' : 'glass-effect'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            NISM Prep
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('modules')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Modules
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="btn-gradient">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('modules')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Modules
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="w-full btn-gradient">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;