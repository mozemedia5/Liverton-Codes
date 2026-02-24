import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Heart, 
  Gift, 
  Coffee, 
  Rocket, 
  Star,
  Loader2,
  Wallet
} from 'lucide-react';
import { createDonation } from '@/lib/firestore';
import { toast } from 'sonner';

const donationReasons = [
  { id: 'support', label: 'Support Development', icon: Rocket, description: 'Help us continue building amazing products' },
  { id: 'feature', label: 'Request a Feature', icon: Star, description: 'Fund a specific feature you want to see' },
  { id: 'coffee', label: 'Buy us Coffee', icon: Coffee, description: 'Fuel our late-night coding sessions' },
  { id: 'appreciation', label: 'Show Appreciation', icon: Heart, description: 'Support the team behind the products you love' },
  { id: 'custom', label: 'Custom Reason', icon: Gift, description: 'Tell us why you want to donate' },
];

const presetAmounts = [5000, 10000, 20000, 50000, 100000];

const Donation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    amount: '',
    reason: '',
    customReason: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.amount || !formData.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    const amount = parseInt(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);

    try {
      await createDonation({
        fullName: formData.fullName,
        email: formData.email,
        amount: amount,
        reason: formData.reason === 'custom' ? formData.customReason : formData.reason,
        message: formData.message,
      });

      setIsSuccess(true);
      toast.success('Thank you for your generosity! We will contact you with payment details.');
    } catch (error) {
      toast.error('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your generosity means the world to us. We will contact you shortly 
              with payment instructions via email.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support <span className="text-pink-400">Liverton Codes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your donation helps us continue building innovative solutions and 
            keeping our applications free for everyone.
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Rocket className="w-8 h-8 mx-auto text-indigo-400 mb-4" />
              <h3 className="font-semibold mb-2">Fuel Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Your support helps us develop new features and improve existing products.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Wallet className="w-8 h-8 mx-auto text-emerald-400 mb-4" />
              <h3 className="font-semibold mb-2">Keep It Free</h3>
              <p className="text-sm text-muted-foreground">
                Donations help us maintain free access to educational tools.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 mx-auto text-amber-400 mb-4" />
              <h3 className="font-semibold mb-2">Shape the Future</h3>
              <p className="text-sm text-muted-foreground">
                Donors get priority access to new features and beta releases.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-pink-400">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Donation Reason */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-pink-400">Reason for Donation *</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {donationReasons.map((reason) => (
                    <div
                      key={reason.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.reason === reason.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-border hover:border-pink-500/50'
                      }`}
                      onClick={() => setFormData({ ...formData, reason: reason.id })}
                    >
                      <div className="flex flex-col items-center text-center">
                        <reason.icon className={`w-6 h-6 mb-2 ${
                          formData.reason === reason.id ? 'text-pink-400' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm font-medium">{reason.label}</span>
                        <span className="text-xs text-muted-foreground mt-1">{reason.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {formData.reason === 'custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="customReason">Your Reason</Label>
                    <Input
                      id="customReason"
                      value={formData.customReason}
                      onChange={(e) => setFormData({ ...formData, customReason: e.target.value })}
                      placeholder="Tell us why you're donating..."
                    />
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-pink-400">Donation Amount (UGX) *</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.amount === amount.toString()
                          ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                          : 'border-border hover:border-pink-500/50'
                      }`}
                      onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customAmount">Or enter custom amount</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Enter amount in UGX"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Leave a message for our team..."
                  rows={3}
                />
              </div>

              {/* Payment Info */}
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground text-center">
                  <Wallet className="w-4 h-4 inline mr-2" />
                  Payment integration with MTN MoMo, Airtel Money, and Flutterwave coming soon. 
                  For now, we will contact you with payment details after submission.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Complete Donation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donation;
