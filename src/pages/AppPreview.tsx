import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  Heart, 
  MessageSquare,
  Loader2,
  Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  createRating, 
  getAverageRating, 
  getRatingCount, 
  toggleLove, 
  getLoveCount,
  hasUserLoved,
  createReview,
  getReviews,
  incrementAppView
} from '@/lib/firestore';
import { toast } from 'sonner';

const apps = {
  'liverton-learning': {
    name: 'Liverton Learning',
    url: 'https://liverton-learning.vercel.app',
    description: 'Interactive educational platform with courses and quizzes.',
  },
  'liverton-quiz': {
    name: 'Liverton Quiz Championship',
    url: 'https://liverton-quiz-championship.vercel.app',
    description: 'Competitive quiz platform with real-time leaderboards.',
  },
  'liverton-shoppers': {
    name: 'Liverton Shoppers',
    url: 'https://acxgsdueikbeg.ok.kimi.link',
    description: 'Modern e-commerce platform with seamless shopping.',
  },
  'longtail': {
    name: 'Longtail',
    url: 'https://hc423tpiapnbg.ok.kimi.link/?sharetype=link',
    description: 'Business analytics dashboard with real-time insights.',
  },
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const AppPreview = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const deviceId = getDeviceId();

  const app = appId ? apps[appId as keyof typeof apps] : null;

  useEffect(() => {
    if (appId) {
      loadData();
      incrementAppView(appId);
    }
  }, [appId]);

  const loadData = async () => {
    if (!appId) return;
    try {
      const [avg, count, loves, loved, appReviews] = await Promise.all([
        getAverageRating(appId),
        getRatingCount(appId),
        getLoveCount(appId),
        hasUserLoved(appId, deviceId),
        getReviews(appId),
      ]);
      setAverageRating(avg);
      setRatingCount(count);
      setLoveCount(loves);
      setIsLoved(loved);
      setReviews(appReviews);
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };

  const handleRating = async (rating: number) => {
    if (!appId) return;
    try {
      await createRating(appId, rating, deviceId);
      setUserRating(rating);
      loadData();
      toast.success('Thank you for rating!');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleLove = async () => {
    if (!appId) return;
    try {
      const newLoved = await toggleLove(appId, deviceId);
      setIsLoved(newLoved);
      loadData();
      toast.success(newLoved ? 'Added to favorites!' : 'Removed from favorites');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId || !reviewName.trim() || !reviewText.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createReview({
        appId,
        userName: reviewName,
        review: reviewText,
        rating: reviewRating,
      });
      setReviewName('');
      setReviewText('');
      setReviewRating(5);
      loadData();
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  if (!app) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Application Not Found</h1>
          <Button onClick={() => navigate('/applications')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Preview Header */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/applications')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{app.name}</h1>
                <p className="text-sm text-muted-foreground">{app.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Rating Display */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${
                        star <= (userRating || averageRating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({ratingCount})
                </span>
              </div>

              {/* Love Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLove}
                className={`${isLoved ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                <Heart className={`w-5 h-5 mr-1 ${isLoved ? 'fill-current' : ''}`} />
                {loveCount}
              </Button>

              {/* Open Full App */}
              <a href={app.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Full App
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Iframe Preview */}
      <div className="relative h-[60vh] md:h-[70vh] bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        )}
        <iframe
          src={app.url}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title={app.name}
        />
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-indigo-400" />
                Write a Review
              </h2>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Your Name</label>
                  <Input
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Your Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= reviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Your Review</label>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this app..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                User Reviews ({reviews.length})
              </h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.review}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
