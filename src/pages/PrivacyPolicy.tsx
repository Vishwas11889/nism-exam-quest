import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p>Last updated: January 2024</p>
            <p>Your privacy is important to us. This policy explains how we collect, use, and protect your data.</p>
            {/* Add full privacy policy content */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;