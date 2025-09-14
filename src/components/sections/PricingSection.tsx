import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Basic",
      icon: Star,
      description: "Perfect for getting started",
      monthlyPrice: 199,
      annualPrice: 1999,
      savings: 20,
      features: [
        "50 practice questions/month",
        "Basic performance insights",
        "Mobile-friendly access",
        "Email support",
        "2 practice tests/week"
      ],
      limitations: [
        "Limited mock tests",
        "Basic analytics only"
      ],
      cta: "Start Basic Plan",
      popular: false
    },
    {
      name: "Pro",
      icon: Zap,
      description: "Most popular choice for serious learners",
      monthlyPrice: 499,
      annualPrice: 4999,
      savings: 35,
      features: [
        "Unlimited practice questions",
        "Advanced progress tracking",
        "All NISM modules access",
        "Detailed performance analytics",
        "Weekly mock tests",
        "Priority email support",
        "Study progress reports",
        "Question bookmarking"
      ],
      limitations: [],
      cta: "Start Pro Plan",
      popular: true
    },
    {
      name: "Premium",
      icon: Crown,
      description: "Complete preparation with expert guidance",
      monthlyPrice: 999,
      annualPrice: 9999,
      savings: 40,
      features: [
        "Everything in Pro plan",
        "1-on-1 expert mentoring",
        "Custom study plans",
        "Live doubt clearing sessions",
        "Exam strategy consultation",
        "Performance guarantee",
        "Early access to new modules",
        "Certificate of completion",
        "Job placement assistance"
      ],
      limitations: [],
      cta: "Start Premium Plan",
      popular: false
    }
  ];

  const calculatePrice = (plan: typeof plans[0]) => {
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const savings = billingPeriod === 'annual' ? plan.savings : 0;
    return { price, savings };
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Flexible plans designed for every learner's needs and budget
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              Annual
            </button>
          </div>
          
          {billingPeriod === 'annual' && (
            <p className="text-sm text-primary mt-2">
              💰 Save up to 40% with annual billing
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const { price, savings } = calculatePrice(plan);
            const IconComponent = plan.icon;
            
            return (
              <div 
                key={index}
                className={`relative bg-card rounded-xl border p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary scale-105 shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-3">
                    <div className={`inline-flex p-3 rounded-full ${
                      plan.popular ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        plan.popular ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold">₹{price}</span>
                      <span className="text-muted-foreground ml-1">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingPeriod === 'annual' && savings > 0 && (
                      <div className="text-sm text-primary">
                        Save {savings}% vs monthly
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitationIndex) => (
                            <li key={limitationIndex} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link to="/payment" state={{ plan: plan.name, billingPeriod, price }}>
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-gradient' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Pricing Info */}
        <div className="mt-16 space-y-8">
          {/* Money Back Guarantee */}
          <div className="text-center bg-primary/5 p-8 rounded-xl border border-primary/20">
            <h3 className="text-xl font-semibold mb-4">30-Day Money-Back Guarantee</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not satisfied with your progress? Get a full refund within 30 days. No questions asked.
            </p>
          </div>

          {/* Enterprise */}
          <div className="text-center bg-card p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-bold mb-4">Enterprise Solution</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking to train your entire team? We offer custom enterprise packages with 
              bulk licensing, dedicated support, and advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline">Contact Sales</Button>
              </Link>
              <Link to="/enterprise">
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;