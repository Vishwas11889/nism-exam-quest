import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Building, Shield, Star, Crown, Zap } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(location.state?.plan || 'Pro');
  const [billingPeriod, setBillingPeriod] = useState(location.state?.billingPeriod || 'monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      name: "Basic",
      icon: Star,
      monthlyPrice: 199,
      annualPrice: 1999,
      savings: 20,
      features: [
        "50 practice questions/month",
        "Basic performance insights",
        "Mobile-friendly access",
        "Email support"
      ]
    },
    {
      name: "Pro",
      icon: Zap,
      monthlyPrice: 499,
      annualPrice: 4999,
      savings: 35,
      features: [
        "Unlimited practice questions",
        "Advanced progress tracking",
        "All NISM modules access",
        "Priority email support",
        "Weekly mock tests"
      ]
    },
    {
      name: "Premium",
      icon: Crown,
      monthlyPrice: 999,
      annualPrice: 9999,
      savings: 40,
      features: [
        "Everything in Pro plan",
        "1-on-1 expert mentoring",
        "Custom study plans",
        "Live doubt clearing sessions",
        "Performance guarantee"
      ]
    }
  ];

  const selectedPlanData = plans.find(plan => plan.name === selectedPlan) || plans[1];
  const price = billingPeriod === 'monthly' ? selectedPlanData.monthlyPrice : selectedPlanData.annualPrice;
  const savings = billingPeriod === 'annual' ? selectedPlanData.savings : 0;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'upi', name: 'UPI', icon: Smartphone, popular: true },
    { id: 'netbanking', name: 'Net Banking', icon: Building, popular: false }
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Welcome to NISM Prep ${selectedPlan} plan. Redirecting to dashboard...`
      });

      // Store subscription data
      localStorage.setItem('userPlan', selectedPlan);
      localStorage.setItem('billingPeriod', billingPeriod);
      localStorage.setItem('subscriptionActive', 'true');
      localStorage.setItem('subscriptionDate', new Date().toISOString());

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Select the perfect plan for your NISM preparation journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Toggle */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className={billingPeriod === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>
                    Monthly
                  </span>
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
                  <span className={billingPeriod === 'annual' ? 'font-medium' : 'text-muted-foreground'}>
                    Annual
                  </span>
                </div>

                {billingPeriod === 'annual' && (
                  <div className="text-center text-sm text-primary mb-6">
                    💰 Save up to 40% with annual billing
                  </div>
                )}

                {/* Plans */}
                <div className="space-y-4">
                  {plans.map((plan) => {
                    const planPrice = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
                    const planSavings = billingPeriod === 'annual' ? plan.savings : 0;
                    const IconComponent = plan.icon;
                    
                    return (
                      <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPlan === plan.name
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${
                              selectedPlan === plan.name ? 'bg-primary/10' : 'bg-muted'
                            }`}>
                              <IconComponent className={`h-5 w-5 ${
                                selectedPlan === plan.name ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{plan.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {plan.features.length} features included
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">₹{planPrice}</div>
                            <div className="text-sm text-muted-foreground">
                              /{billingPeriod === 'monthly' ? 'month' : 'year'}
                            </div>
                            {planSavings > 0 && (
                              <Badge className="mt-1">Save {planSavings}%</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <span className="font-medium">{method.name}</span>
                          {method.popular && (
                            <Badge variant="outline">Popular</Badge>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === method.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-medium">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing</span>
                  <span className="font-medium capitalize">{billingPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{price}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-₹{Math.floor(price * savings / (100 - savings))}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{price}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <h4 className="font-medium">Plan Features:</h4>
                  {selectedPlanData.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full btn-gradient mt-6"
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? "Processing Payment..." : `Pay ₹${price}`}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  Secure payment powered by 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>

            {/* Money Back Guarantee */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">30-Day Money-Back Guarantee</h4>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;