import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  Users,
  MessageCircle,
  Twitter,
  Youtube,
  Smartphone,
  Zap,
  Activity,
  Clock,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Influencer {
  id: string;
  name: string;
  platform: string;
  avatar_url: string;
  score: number;
  tier: string;
  tier_color: string;
  trend: number;
  followers: number;
  engagement_rate: number;
  bio: string;
  profile_url: string;
}

interface Activity {
  id: string;
  activity_type: string;
  description: string;
  impact_score: number;
  created_at: string;
}

interface Post {
  id: string;
  content: string;
  post_url: string;
  likes: number;
  shares: number;
  comments: number;
  sentiment_score: number;
  created_at: string;
}

interface ScoreHistory {
  id: string;
  score: number;
  recorded_at: string;
}

interface InfluencerDetailModalProps {
  influencer: Influencer | null;
  isOpen: boolean;
  onClose: () => void;
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'telegram': return <MessageCircle className="w-4 h-4" />;
    case 'x': return <Twitter className="w-4 h-4" />;
    case 'youtube': return <Youtube className="w-4 h-4" />;
    case 'app': return <Smartphone className="w-4 h-4" />;
    default: return null;
  }
};

const getPlatformStyle = (platform: string) => {
  switch (platform) {
    case 'telegram': return 'bg-[#0088cc]/20 text-[#0088cc] border-[#0088cc]/30';
    case 'x': return 'bg-white/10 text-white border-white/20';
    case 'youtube': return 'bg-[#ff0000]/20 text-[#ff4444] border-[#ff0000]/30';
    case 'app': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getTierStyle = (tierColor: string) => {
  switch (tierColor) {
    case 'cyan': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
    case 'purple': return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
    case 'blue': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    case 'green': return 'bg-green-500/20 text-green-400 border-green-500/40';
    case 'orange': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'alpha_call': return <Zap className="w-4 h-4 text-yellow-400" />;
    case 'thread': return <MessageSquare className="w-4 h-4 text-blue-400" />;
    case 'analysis': return <Activity className="w-4 h-4 text-purple-400" />;
    case 'breaking': return <Zap className="w-4 h-4 text-red-400" />;
    case 'on_chain': return <Activity className="w-4 h-4 text-green-400" />;
    case 'research': return <Activity className="w-4 h-4 text-cyan-400" />;
    case 'investment': return <TrendingUp className="w-4 h-4 text-green-400" />;
    case 'collab': return <Users className="w-4 h-4 text-purple-400" />;
    case 'community_event': return <Users className="w-4 h-4 text-cyan-400" />;
    case 'prediction': return <TrendingUp className="w-4 h-4 text-orange-400" />;
    default: return <Activity className="w-4 h-4 text-gray-400" />;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
};

const InfluencerDetailModal = ({ influencer, isOpen, onClose }: InfluencerDetailModalProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [scoreHistory, setScoreHistory] = useState<ScoreHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'activity' | 'posts'>('activity');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (influencer && isOpen) {
      fetchInfluencerDetails();
    }
  }, [influencer, isOpen]);

  const fetchInfluencerDetails = async () => {
    if (!influencer) return;
    setIsLoading(true);

    const [activitiesRes, postsRes, historyRes] = await Promise.all([
      supabase
        .from('influencer_activities')
        .select('*')
        .eq('influencer_id', influencer.id)
        .order('created_at', { ascending: false })
        .limit(10),
      supabase
        .from('influencer_posts')
        .select('*')
        .eq('influencer_id', influencer.id)
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('influencer_score_history')
        .select('*')
        .eq('influencer_id', influencer.id)
        .order('recorded_at', { ascending: true })
    ]);

    if (activitiesRes.data) setActivities(activitiesRes.data);
    if (postsRes.data) setPosts(postsRes.data);
    if (historyRes.data) setScoreHistory(historyRes.data);
    setIsLoading(false);
  };

  const chartData = scoreHistory.map(item => ({
    date: new Date(item.recorded_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    score: Number(item.score)
  }));

  if (!influencer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              <div className="flex items-start gap-4">
                <img
                  src={influencer.avatar_url}
                  alt={influencer.name}
                  className="w-16 h-16 rounded-full bg-white/10 border border-white/10"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-white">{influencer.name}</h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${getPlatformStyle(influencer.platform)}`}>
                      {getPlatformIcon(influencer.platform)}
                      <span className="capitalize">{influencer.platform === 'x' ? 'X' : influencer.platform}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTierStyle(influencer.tier_color)}`}>
                      {influencer.tier}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 line-clamp-2">{influencer.bio}</p>
                  {influencer.profile_url && (
                    <a
                      href={influencer.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm text-[#00E0FF] hover:underline"
                    >
                      Visit Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-[#00E0FF]">{Number(influencer.score).toFixed(1)}</div>
                  <div className="text-xs text-white/40">ium Score</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">{formatNumber(influencer.followers)}</div>
                  <div className="text-xs text-white/40">Followers</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">{Number(influencer.engagement_rate).toFixed(1)}%</div>
                  <div className="text-xs text-white/40">Engagement</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${influencer.trend > 0 ? 'text-green-400' : influencer.trend < 0 ? 'text-red-400' : 'text-white/40'}`}>
                    {influencer.trend > 0 ? <TrendingUp className="w-5 h-5" /> : influencer.trend < 0 ? <TrendingDown className="w-5 h-5" /> : null}
                    {influencer.trend > 0 ? `+${influencer.trend}` : influencer.trend}
                  </div>
                  <div className="text-xs text-white/40">7D Trend</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
              {/* Score Graph */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/80 mb-3">Score Trend (14 Days)</h3>
                <div className="h-40 bg-white/5 rounded-xl p-4">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center text-white/40">Loading...</div>
                  ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          tickLine={false}
                        />
                        <YAxis 
                          domain={['dataMin - 1', 'dataMax + 1']}
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          tickLine={false}
                          width={40}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#00E0FF" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: '#00E0FF' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/40">No data available</div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'activity' 
                      ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/30' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Activity History
                </button>
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'posts' 
                      ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/30' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Recent Posts
                </button>
              </div>

              {/* Activity History */}
              {activeTab === 'activity' && (
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-white/40">Loading...</div>
                  ) : activities.length > 0 ? (
                    activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/[0.07] transition-colors">
                        <div className="p-2 rounded-lg bg-white/10">
                          {getActivityIcon(activity.activity_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{activity.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-white/40 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(activity.created_at)}
                            </span>
                            <span className="text-xs text-[#00E0FF]">
                              Impact: {activity.impact_score}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/40">No activity history</div>
                  )}
                </div>
              )}

              {/* Recent Posts */}
              {activeTab === 'posts' && (
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-8 text-white/40">Loading...</div>
                  ) : posts.length > 0 ? (
                    posts.map((post) => (
                      <a
                        key={post.id}
                        href={post.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg bg-white/5 hover:bg-white/[0.07] transition-colors"
                      >
                        <p className="text-sm text-white mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {formatNumber(post.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            {formatNumber(post.shares)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {formatNumber(post.comments)}
                          </span>
                          <span className={`ml-auto ${Number(post.sentiment_score) >= 0.7 ? 'text-green-400' : Number(post.sentiment_score) >= 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                            Sentiment: {(Number(post.sentiment_score) * 100).toFixed(0)}%
                          </span>
                          <span className="text-white/40">{formatDate(post.created_at)}</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/40">No posts available</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InfluencerDetailModal;
