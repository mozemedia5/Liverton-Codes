import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Applications', path: '/applications' },
      { label: 'Data Analysis', path: '/data-analysis' },
    ],
    services: [
      { label: 'Website Development', path: '/order' },
      { label: 'Mobile Apps', path: '/order' },
      { label: 'Desktop Apps', path: '/order' },
      { label: 'Data Analysis', path: '/order' },
    ],
    support: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Make an Order', path: '/order' },
      { label: 'Donate', path: '/donate' },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Liverton Codes
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building Intelligent Digital Systems. We create scalable, impactful software solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>livertoncodes@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+256 791 756 647</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            {currentYear} Liverton Codes. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Liverton Codes Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
