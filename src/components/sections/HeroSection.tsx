import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    questions: 0,
    passRate: 0,
    speedMultiplier: 0,
    successStories: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const targets = {
        questions: 450,
        passRate: 78,
        speedMultiplier: 2,
        successStories: 15000
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          questions: Math.floor(targets.questions * progress),
          passRate: Math.floor(targets.passRate * progress),
          speedMultiplier: Math.floor(targets.speedMultiplier * progress),
          successStories: Math.floor(targets.successStories * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23E2E8F0' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Your <span className="text-gradient">NISM Certification</span> with Confidence
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Realistic mock tests, smart analytics, and comprehensive preparation for financial professionals. 
                Join thousands who've accelerated their career growth.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary">
                  {animatedStats.questions}+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Practice Questions
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary">
                  {animatedStats.passRate}%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Average Pass Rate
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary">
                  {animatedStats.speedMultiplier}x
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Faster Preparation
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.floor(animatedStats.successStories / 1000)}K+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Success Stories
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="btn-gradient group">
                  Start Your Preparation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Instant access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Expert support</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Mock Test Interface */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
                {/* Mock Browser Header */}
                <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 border-b border-border">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-200 rounded-md mx-3 h-6"></div>
                </div>
                
                {/* Mock Test Content */}
                <div className="p-6 space-y-4">
                  <div className="text-sm text-muted-foreground">Question 15 of 50</div>
                  <h4 className="font-semibold text-lg">
                    Which of the following is a key benefit of mutual fund investments?
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      A) Guaranteed returns
                    </div>
                    <div className="p-3 border-2 border-primary bg-primary/10 rounded-lg cursor-pointer">
                      B) Professional management
                    </div>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      C) No market risk
                    </div>
                    <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      D) Fixed income
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" size="sm">Previous</Button>
                    <div className="text-sm text-muted-foreground">Time: 22:15</div>
                    <Button size="sm" className="btn-gradient">Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;