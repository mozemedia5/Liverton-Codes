import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Phone,
  MapPin,
  Clock,
  Loader2
} from 'lucide-react';
import { createContactSubmission } from '@/lib/firestore';
import { toast } from 'sonner';

const Contact = () => {
  const [emailForm, setEmailForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [whatsappForm, setWhatsappForm] = useState({
    name: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailForm.fullName || !emailForm.email || !emailForm.subject || !emailForm.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactSubmission({
        fullName: emailForm.fullName,
        email: emailForm.email,
        subject: emailForm.subject,
        message: emailForm.message,
      });

      // Open mail client
      const mailtoLink = `mailto:livertoncodes@gmail.com?subject=${encodeURIComponent(
        emailForm.subject
      )}&body=${encodeURIComponent(
        `Name: ${emailForm.fullName}\nEmail: ${emailForm.email}\n\nMessage:\n${emailForm.message}`
      )}`;
      
      window.open(mailtoLink, '_blank');
      
      setEmailForm({ fullName: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!whatsappForm.name || !whatsappForm.message) {
      toast.error('Please fill in all fields');
      return;
    }

    const phoneNumber = '256791756647';
    const whatsappMessage = `Name: ${whatsappForm.name}\n\nMessage: ${whatsappForm.message}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappLink, '_blank');
    setWhatsappForm({ name: '', message: '' });
    toast.success('Opening WhatsApp...');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'livertoncodes@gmail.com',
      href: 'mailto:livertoncodes@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+256 791 756 647',
      href: 'tel:+256791756647',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kampala, Uganda',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-indigo-400">Liverton Codes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us. We'd love to hear from you and discuss how we can help 
            bring your ideas to life.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              className="group p-4 rounded-xl bg-card border border-border hover:border-indigo-500/50 transition-all text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
                <info.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{info.label}</p>
              <p className="text-sm font-medium">{info.value}</p>
            </a>
          ))}
        </div>

        {/* Contact Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-indigo-400" />
                Send us an Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={emailForm.fullName}
                      onChange={(e) => setEmailForm({ ...emailForm, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    placeholder="How can we help?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
                Contact via WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsappName">Your Name</Label>
                  <Input
                    id="whatsappName"
                    value={whatsappForm.name}
                    onChange={(e) => setWhatsappForm({ ...whatsappForm, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappMessage">Message</Label>
                  <Textarea
                    id="whatsappMessage"
                    value={whatsappForm.message}
                    onChange={(e) => setWhatsappForm({ ...whatsappForm, message: e.target.value })}
                    placeholder="Hi, I'm interested in..."
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open WhatsApp Chat
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  You will be redirected to WhatsApp to complete your message
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
