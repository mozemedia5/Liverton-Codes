import { 
  Code2, 
  Smartphone, 
  Monitor, 
  Apple, 
  Database, 
  FileText, 
  Headphones,
  GraduationCap,
  Wrench,
  Target,
  Rocket
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const services = [
    {
      icon: Monitor,
      title: 'Website Development',
      description: 'Modern, responsive websites built with cutting-edge technologies.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform apps for Android and iOS.',
    },
    {
      icon: Monitor,
      title: 'Desktop Applications',
      description: 'Powerful desktop software for Windows and Linux.',
    },
    {
      icon: Apple,
      title: 'Mac Applications',
      description: 'Elegant macOS applications with native performance.',
    },
    {
      icon: Database,
      title: 'Data Analysis',
      description: 'Transform raw data into actionable business insights.',
    },
    {
      icon: FileText,
      title: 'Data Entry',
      description: 'Accurate and efficient data processing services.',
    },
    {
      icon: Headphones,
      title: 'Text-to-Audio Systems',
      description: 'Advanced voice synthesis and audio solutions.',
    },
    {
      icon: GraduationCap,
      title: 'Educational Systems',
      description: 'Custom e-learning platforms and educational tools.',
    },
    {
      icon: Wrench,
      title: 'Custom Digital Tools',
      description: 'Bespoke software solutions tailored to your needs.',
    },
  ];

  const team = [
    {
      icon: Code2,
      title: 'Software Developers',
      description: 'Expert programmers building robust backend systems.',
    },
    {
      icon: Monitor,
      title: 'Web Developers',
      description: 'Frontend specialists creating stunning user interfaces.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Developers',
      description: 'App creators for iOS and Android platforms.',
    },
    {
      icon: Database,
      title: 'Data Analysts',
      description: 'Data scientists extracting meaningful insights.',
    },
    {
      icon: Target,
      title: 'System Architects',
      description: 'Strategic planners designing scalable solutions.',
    },
  ];

  const products = [
    {
      name: 'Liverton Learning',
      description: 'Comprehensive educational platform',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Liverton Quiz Championship',
      description: 'Competitive quiz gaming platform',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Liverton Shoppers',
      description: 'Modern e-commerce solution',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Longtail',
      description: 'Business analytics dashboard',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-indigo-400">Liverton Codes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a team of passionate developers, designers, and innovators dedicated to 
            building intelligent digital systems that transform businesses and empower users.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To deliver scalable, impactful software solutions that solve real-world problems 
                and drive digital transformation for businesses of all sizes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the leading software development company in Africa, known for 
                innovation, quality, and exceptional customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Products */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Products We Have Built
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.name} className="group hover:border-indigo-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Our Expert Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Built by experienced professionals who are passionate about technology
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member) => (
              <Card key={member.title} className="group hover:border-indigo-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                    <member.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{member.title}</h3>
                  <p className="text-xs text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">Services We Offer</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Comprehensive digital solutions tailored to your business needs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="group hover:border-indigo-500/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                    <service.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '4+', label: 'Applications Built' },
            { value: '9+', label: 'Services Offered' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
