import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Database,
  FileSpreadsheet,
  LineChart,
  Send,
  Star,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { createReview, getReviews } from '@/lib/firestore';
import { toast } from 'sonner';

const features = [
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description: 'Transform complex data into beautiful, interactive charts and dashboards.',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Identify patterns and trends to make data-driven decisions.',
  },
  {
    icon: PieChart,
    title: 'Statistical Analysis',
    description: 'Comprehensive statistical modeling and hypothesis testing.',
  },
  {
    icon: Activity,
    title: 'Real-time Analytics',
    description: 'Monitor your metrics in real-time with live dashboards.',
  },
  {
    icon: Database,
    title: 'Data Processing',
    description: 'Clean, transform, and prepare data for analysis.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Report Generation',
    description: 'Automated reports with actionable insights.',
  },
];

const sampleProjects = [
  {
    title: 'Sales Performance Dashboard',
    description: 'Interactive dashboard tracking monthly sales, revenue trends, and regional performance.',
    metrics: ['Revenue Growth', 'Conversion Rate', 'Customer Acquisition'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Customer Analytics',
    description: 'Deep dive into customer behavior, segmentation, and lifetime value analysis.',
    metrics: ['Churn Rate', 'CLV', 'NPS Score'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Financial Forecasting',
    description: 'Predictive models for revenue forecasting and budget optimization.',
    metrics: ['ROI', 'Cash Flow', 'Risk Analysis'],
    color: 'from-emerald-500 to-teal-500',
  },
];

const DataAnalysis = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const appId = 'data-analysis';

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews(appId);
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
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
      loadReviews();
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
            <LineChart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Data <span className="text-emerald-400">Analysis</span> Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your raw data into actionable insights. Our expert data analysts 
            help you make informed decisions that drive business growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:border-emerald-500/50 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Projects */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sample <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleProjects.map((project) => (
              <Card key={project.title} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-emerald-400">Process</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Data Collection', desc: 'Gather data from various sources' },
              { step: '2', title: 'Cleaning', desc: 'Remove inconsistencies and errors' },
              { step: '3', title: 'Analysis', desc: 'Apply statistical methods' },
              { step: '4', title: 'Insights', desc: 'Deliver actionable reports' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-emerald-400">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-emerald-400" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <Label htmlFor="reviewName">Your Name</Label>
                  <Input
                    id="reviewName"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="reviewRating">Your Rating</Label>
                  <div className="flex items-center space-x-1 mt-2">
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
                  <Label htmlFor="reviewText">Your Review</Label>
                  <Textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with our data analysis services..."
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <Card>
            <CardHeader>
              <CardTitle>Client Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to share your experience!
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss how we can help you make data-driven decisions.
          </p>
          <a href="/order">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              Start Your Data Project
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
