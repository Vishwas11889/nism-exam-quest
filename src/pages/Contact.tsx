import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-muted-foreground mb-8">
              Get in touch with our support team for any questions or assistance.
            </p>
            {/* Add contact form and details */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;