import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p>Last updated: January 2024</p>
            <p>We offer a 30-day money-back guarantee on all our plans.</p>
            {/* Add full refund policy content */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;