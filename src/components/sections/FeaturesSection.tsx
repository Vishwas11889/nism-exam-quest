import React from 'react';
import { Clock, BarChart3, BookOpen, Target, Smartphone, Trophy } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Realistic Timed Exams",
      description: "Practice with authentic exam conditions including proper timing and question formats"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track your progress with detailed performance insights and identify improvement areas"
    },
    {
      icon: BookOpen,
      title: "Detailed Explanations",
      description: "Understand every concept with comprehensive explanations for each question"
    },
    {
      icon: Target,
      title: "Module-wise Practice",
      description: "Focus on specific areas with targeted practice tests for each NISM module"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Study anywhere, anytime with our responsive platform that works on all devices"
    },
    {
      icon: Trophy,
      title: "Proven Success",
      description: "Join thousands of professionals who've achieved certification success through our platform"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our <span className="text-gradient">NISM Prep Platform</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to excel in your NISM certification journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="text-2xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm font-medium text-muted-foreground">Platform Uptime</div>
            </div>
            <div className="p-6 bg-success/5 rounded-xl border border-success/20">
              <div className="text-2xl font-bold text-success mb-2">24/7</div>
              <div className="text-sm font-medium text-muted-foreground">Expert Support</div>
            </div>
            <div className="p-6 bg-accent/5 rounded-xl border border-accent/20">
              <div className="text-2xl font-bold text-accent mb-2">50ms</div>
              <div className="text-sm font-medium text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;