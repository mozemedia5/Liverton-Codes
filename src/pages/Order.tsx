import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Briefcase, 
  Loader2, 
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  Apple,
  Database,
  FileText,
  Headphones,
  GraduationCap,
  Wrench
} from 'lucide-react';
import { createOrder } from '@/lib/firestore';
import { toast } from 'sonner';

const services = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
  { id: 'desktop', label: 'Desktop App', icon: Monitor },
  { id: 'ios', label: 'iOS App', icon: Apple },
  { id: 'mac', label: 'Mac App', icon: Monitor },
  { id: 'data-analysis', label: 'Data Analysis', icon: Database },
  { id: 'data-entry', label: 'Data Entry', icon: FileText },
  { id: 'text-to-audio', label: 'Text-to-Audio', icon: Headphones },
  { id: 'educational', label: 'Educational System', icon: GraduationCap },
  { id: 'custom', label: 'Custom Software', icon: Wrench },
  { id: 'other', label: 'Other', icon: Briefcase },
];

const businessTypes = [
  'Startup',
  'Small Business',
  'Medium Enterprise',
  'Large Corporation',
  'Non-Profit',
  'Educational Institution',
  'Government',
  'Personal Project',
  'Other',
];

const designStyles = [
  'Modern & Minimalist',
  'Corporate & Professional',
  'Creative & Bold',
  'Elegant & Luxury',
  'Playful & Friendly',
  'Tech & Futuristic',
  'Not Sure - Need Guidance',
];

const timelines = [
  'Less than 1 month',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Not Sure',
];

const Order = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    services: [] as string[],
    projectDescription: '',
    targetAudience: '',
    designStyle: '',
    timeline: '',
    budgetRange: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.services.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessType: formData.businessType,
        services: formData.services,
        projectDescription: formData.projectDescription,
        targetAudience: formData.targetAudience,
        designStyle: formData.designStyle,
        timeline: formData.timeline,
        budgetRange: formData.budgetRange,
        additionalNotes: formData.additionalNotes,
      });

      setIsSuccess(true);
      toast.success('Order submitted successfully! We will contact you soon.');
    } catch (error) {
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. Our team will review your requirements and 
              contact you within 24 hours.
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Make an <span className="text-indigo-400">Order</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and we'll bring your vision to life. 
            Fill out the form below to get started.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400">Personal Information</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+256 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name (Optional)</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Your Company Ltd"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400">Services Needed *</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.services.includes(service.id)
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-border hover:border-indigo-500/50'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <service.icon className={`w-6 h-6 mb-2 ${
                          formData.services.includes(service.id) ? 'text-indigo-400' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm">{service.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400">Project Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Describe Your Project</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    placeholder="Tell us about your project goals, features you need, and any specific requirements..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="Who will be using this product?"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designStyle">Preferred Design Style</Label>
                    <Select
                      value={formData.designStyle}
                      onValueChange={(value) => setFormData({ ...formData, designStyle: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select design style" />
                      </SelectTrigger>
                      <SelectContent>
                        {designStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline Expectation</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400">Additional Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="budgetRange">Budget Range</Label>
                  <Input
                    id="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    placeholder="e.g., $1000 - $5000 (optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Any other details you'd like to share..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Order'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Order;
