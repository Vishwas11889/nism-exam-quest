import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How realistic are your mock tests?",
      answer: "Our mock tests are designed to replicate the actual NISM exam experience, including question formats, timing, and difficulty levels. We use the same 50-question, 30-minute format as the real exam, with questions curated by NISM-certified professionals."
    },
    {
      question: "Can I practice without time pressure?",
      answer: "Absolutely! We offer both practice tests (no timer) for learning and final mock tests (timed) for exam simulation. This allows you to learn concepts thoroughly before testing under pressure."
    },
    {
      question: "Do you provide explanations for answers?",
      answer: "Yes! Every question comes with detailed explanations to help you understand the correct answer and learn from your mistakes. Our explanations include concepts, formulas, and real-world applications."
    },
    {
      question: "How often is content updated?",
      answer: "We update our question bank quarterly to reflect any changes in NISM syllabus and regulations. All content is reviewed by NISM-certified professionals and aligned with the latest industry standards."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed securely through industry-standard encryption."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account settings. For annual plans, we offer pro-rated refunds if cancelled within the first 30 days."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our platform within the first 30 days of purchase, we'll provide a full refund with no questions asked."
    },
    {
      question: "Is there mobile app support?",
      answer: "Currently, we offer a responsive web platform that works seamlessly on all devices. A dedicated mobile app for iOS and Android is in development and will be available soon."
    },
    {
      question: "How does the performance tracking work?",
      answer: "Our advanced analytics track your progress across different topics, identify weak areas, show improvement trends, and provide personalized recommendations to optimize your study plan."
    },
    {
      question: "Do you provide certificates upon completion?",
      answer: "Yes, Premium plan subscribers receive a certificate of completion for each module. While this doesn't replace the official NISM certification, it demonstrates your preparation level to employers."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Frequently Asked</span> Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our platform and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 text-center bg-card p-8 rounded-xl border border-border">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@nismprep.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Email Support
            </a>
            <a 
              href="tel:+911234567890"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;