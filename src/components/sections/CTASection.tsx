import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main CTA Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to <span className="text-gradient">Accelerate Your</span><br />
              NISM Preparation?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of financial professionals who've succeeded with our comprehensive 
              preparation platform. Start your journey to certification success today.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Instant access to all modules</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Expert support included</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="btn-gradient group text-lg px-8 py-4">
                Start Your Preparation Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Pricing Plans
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">15,000+</div>
                <div className="text-sm text-muted-foreground">Students Trained</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">78%</div>
                <div className="text-sm text-muted-foreground">Average Pass Rate</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Industry leading success rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">4.8/5</div>
                <div className="text-sm text-muted-foreground">Student Rating</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on 2,500+ reviews
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-card p-8 rounded-xl border border-border max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg italic text-muted-foreground mb-4">
              "The mock tests were incredibly realistic and the detailed explanations helped me 
              understand concepts I was struggling with. Passed my NISM Series V-A on the first attempt!"
            </blockquote>
            <div className="text-sm">
              <div className="font-semibold">Priya Sharma</div>
              <div className="text-muted-foreground">Financial Advisor, HDFC Bank</div>
            </div>
          </div>

          {/* Final Encouragement */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Don't wait – your NISM certification is just one step away. 
              <br className="hidden sm:block" />
              <strong className="text-foreground">Start your success story today!</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;