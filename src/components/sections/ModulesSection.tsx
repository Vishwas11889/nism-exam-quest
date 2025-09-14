import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulesSection = () => {
  const modules = [
    {
      title: "Mutual Funds Basics",
      series: "Series V-A",
      description: "Comprehensive coverage of mutual fund fundamentals, structures, and regulatory framework.",
      features: [
        "Fund structures and types",
        "NAV calculations",
        "Investment strategies",
        "Regulatory framework",
        "Risk assessment"
      ],
      stats: {
        questions: "150+",
        practiceTests: "5",
        mockTests: "2"
      },
      difficulty: "Beginner",
      featured: false
    },
    {
      title: "Equity Derivatives",
      series: "Series VIII",
      description: "Master equity derivatives with advanced concepts in options, futures, and trading strategies.",
      features: [
        "Options and futures",
        "Pricing models",
        "Risk management",
        "Trading strategies",
        "Market dynamics"
      ],
      stats: {
        questions: "200+",
        practiceTests: "8",
        mockTests: "3"
      },
      difficulty: "Advanced",
      featured: true
    },
    {
      title: "Currency Derivatives",
      series: "Series IV",
      description: "Specialized training in currency markets, hedging strategies, and international finance.",
      features: [
        "Currency markets",
        "Hedging strategies",
        "Cross-currency rates",
        "Risk assessment",
        "International finance"
      ],
      stats: {
        questions: "100+",
        practiceTests: "4",
        mockTests: "2"
      },
      difficulty: "Intermediate",
      featured: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="modules" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">NISM Modules</span> Covered
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive preparation for the most popular NISM certifications with expert-curated content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-xl border p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                module.featured 
                  ? 'border-primary scale-105 shadow-lg' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Featured Badge */}
              {module.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{module.title}</h3>
                    <Badge variant="outline" className="text-primary border-primary">
                      {module.series}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Topics Covered
                  </h4>
                  <ul className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary">{module.stats.questions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary">{module.stats.practiceTests}</div>
                    <div className="text-xs text-muted-foreground">Practice Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary">{module.stats.mockTests}</div>
                    <div className="text-xs text-muted-foreground">Mock Tests</div>
                  </div>
                </div>

                {/* CTA */}
                <Link to="/register">
                  <Button 
                    className={`w-full ${module.featured ? 'btn-gradient' : ''}`}
                    variant={module.featured ? 'default' : 'outline'}
                  >
                    Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Module Info */}
        <div className="mt-16 text-center bg-card p-8 rounded-xl border border-border">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold">Need a Custom Module?</h3>
            <p className="text-muted-foreground">
              We're constantly expanding our module coverage. Request specific NISM certifications 
              and we'll prioritize them based on demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline">Request Module</Button>
              </Link>
              <Link to="/roadmap">
                <Button>View Roadmap</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;