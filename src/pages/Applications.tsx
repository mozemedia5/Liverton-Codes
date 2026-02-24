import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Trophy, 
  ShoppingCart, 
  BarChart3, 
  Star, 
  Heart, 
  ExternalLink, 
  Eye,
  MessageSquare
} from 'lucide-react';
import { 
  createRating, 
  getAverageRating, 
  getRatingCount, 
  toggleLove, 
  getLoveCount,
  hasUserLoved,
  getReviews,
  incrementAppView
} from '@/lib/firestore';
import { toast } from 'sonner';

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  url: string;
  color: string;
  tags: string[];
}

const applications: App[] = [
  {
    id: 'liverton-learning',
    name: 'Liverton Learning',
    description: 'A comprehensive educational platform offering interactive courses, quizzes, and personalized learning paths for students of all levels.',
    icon: BookOpen,
    url: 'https://liverton-learning.vercel.app',
    color: 'from-blue-500 to-cyan-500',
    tags: ['Education', 'E-Learning', 'Interactive'],
  },
  {
    id: 'liverton-quiz',
    name: 'Liverton Quiz Championship',
    description: 'Competitive quiz platform with real-time leaderboards, multiplayer challenges, and a vast library of topics to test your knowledge.',
    icon: Trophy,
    url: 'https://liverton-quiz-championship.vercel.app',
    color: 'from-amber-500 to-orange-500',
    tags: ['Gaming', 'Quiz', 'Competitive'],
  },
  {
    id: 'liverton-shoppers',
    name: 'Liverton Shoppers',
    description: 'Modern e-commerce platform with seamless shopping experience, secure payments, and fast delivery tracking.',
    icon: ShoppingCart,
    url: 'https://acxgsdueikbeg.ok.kimi.link',
    color: 'from-pink-500 to-rose-500',
    tags: ['E-Commerce', 'Shopping', 'Retail'],
  },
  {
    id: 'longtail',
    name: 'Longtail',
    description: 'Advanced business analytics dashboard providing real-time insights, data visualization, and predictive analytics for smarter decisions.',
    icon: BarChart3,
    url: 'https://hc423tpiapnbg.ok.kimi.link/?sharetype=link',
    color: 'from-emerald-500 to-teal-500',
    tags: ['Analytics', 'Business', 'Data'],
  },
];

const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const AppCard = ({ app }: { app: App }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const deviceId = getDeviceId();

  useEffect(() => {
    loadData();
  }, [app.id]);

  const loadData = async () => {
    try {
      const [avg, count, loves, loved, appReviews] = await Promise.all([
        getAverageRating(app.id),
        getRatingCount(app.id),
        getLoveCount(app.id),
        hasUserLoved(app.id, deviceId),
        getReviews(app.id),
      ]);
      setAverageRating(avg);
      setRatingCount(count);
      setLoveCount(loves);
      setIsLoved(loved);
      setReviews(appReviews.slice(0, 2));
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };

  const handleRating = async (rating: number) => {
    try {
      await createRating(app.id, rating, deviceId);
      setUserRating(rating);
      loadData();
      toast.success('Thank you for rating!');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleLove = async () => {
    try {
      const newLoved = await toggleLove(app.id, deviceId);
      setIsLoved(newLoved);
      loadData();
      toast.success(newLoved ? 'Added to favorites!' : 'Removed from favorites');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  const handlePreview = () => {
    incrementAppView(app.id);
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <app.icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLove}
              className={`rounded-full ${isLoved ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-5 h-5 ${isLoved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
            {app.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {app.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-4 h-4 transition-colors ${
                    star <= (userRating || averageRating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              ({ratingCount})
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            {loveCount}
          </div>
        </div>

        {/* Reviews Preview */}
        {reviews.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              Recent Reviews
            </div>
            {reviews.map((review) => (
              <div key={review.id} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <span className="font-medium text-foreground">{review.userName}:</span> {review.review}
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Link to={`/preview/${app.id}`} className="flex-1" onClick={handlePreview}>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className={`w-full bg-gradient-to-r ${app.color} text-white`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const Applications = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-indigo-400">Applications</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative applications built with cutting-edge technology 
            and exceptional user experience.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have an idea for a new application?
          </p>
          <Link to="/order">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applications;
