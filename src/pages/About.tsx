import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">About NISM Prep</h1>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground text-center">
              We're dedicated to helping financial professionals excel in their NISM certifications through comprehensive preparation tools and expert guidance.
            </p>
            {/* Add more content */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;