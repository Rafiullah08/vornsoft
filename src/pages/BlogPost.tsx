import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Heart, MessageCircle, Send, Clock, User } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  content: string;
  user_name: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogLikes, setBlogLikes] = useState(0);
  const [userLikedBlog, setUserLikedBlog] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  
  const { toast } = useToast();

  // Load post and comments
  useEffect(() => {
    if (slug) {
      loadPost();
      loadComments();
    }
  }, [slug]);

  // Check if user liked this blog (from localStorage)
  useEffect(() => {
    if (post) {
      const liked = localStorage.getItem(`blog_liked_${post.id}`);
      setUserLikedBlog(liked === 'true');
      
      const storedLikes = localStorage.getItem(`blog_likes_${post.id}`);
      if (storedLikes) {
        setBlogLikes(parseInt(storedLikes));
      } else {
        // Random initial likes for demo
        const randomLikes = Math.floor(Math.random() * 50) + 20;
        setBlogLikes(randomLikes);
        localStorage.setItem(`blog_likes_${post.id}`, randomLikes.toString());
      }
    }
  }, [post]);

  const loadPost = async () => {
    try {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      
      setPost(data);
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      // First get post id
      const { data: postData } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", slug)
        .single();
      
      if (!postData) return;

      const { data, error } = await (supabase as any)
        .from("blog_comments")
        .select("*")
        .eq("post_id", postData.id)
        .order("created_at", { ascending: false });
    
      if (!error && data) {
        setComments(data as Comment[]);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) {
      toast({ title: "Please write a comment", variant: "destructive" });
      return;
    }

    if (!commenterName.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }

    // Get post id
    const { data: postData } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single();
    
    if (!postData) {
      toast({ title: "Post not found", variant: "destructive" });
      return;
    }

    const comment = {
      post_id: postData.id,
      content: newComment,
      user_name: commenterName.trim(),
    };

    const { error } = await (supabase as any)
      .from("blog_comments")
      .insert(comment);

    if (error) {
      toast({ title: "Error posting comment", variant: "destructive" });
    } else {
      toast({ title: "Comment posted!" });
      setNewComment("");
      setCommenterName("");
      loadComments();
    }
  };

  const handleBlogLike = () => {
    if (!post) return;

    const newLikedState = !userLikedBlog;
    setUserLikedBlog(newLikedState);
    
    // Update localStorage
    localStorage.setItem(`blog_liked_${post.id}`, newLikedState.toString());
    
    // Update like count
    const newCount = newLikedState ? blogLikes + 1 : blogLikes - 1;
    setBlogLikes(newCount);
    localStorage.setItem(`blog_likes_${post.id}`, newCount.toString());
    
    toast({ 
      title: newLikedState ? "Liked!" : "Unliked", 
      description: newLikedState ? "Thanks for your appreciation" : "Maybe next time"
    });
  };

  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 5);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
            <div className="mt-4 text-muted-foreground">Loading post...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 gradient-accent rounded-lg text-accent-foreground font-medium hover:opacity-90 transition-all">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Featured Image - Fixed contrast issue */}
      {post.featured_image ? (
        <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
          
          {/* Title Overlay - Now with better contrast */}
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-16">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-accent mb-4 transition-colors bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm w-fit"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 drop-shadow-md bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm w-fit">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> 
                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 pt-16">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Blog Content */}
          <article className="mb-16">
            {post.content && (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Like Button - Anyone can like */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBlogLike}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                    userLikedBlog 
                      ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' 
                      : 'border-border hover:border-accent hover:text-accent'
                  }`}
                >
                  <Heart size={24} fill={userLikedBlog ? 'currentColor' : 'none'} />
                  <span className="font-semibold text-lg">{blogLikes}</span>
                </button>
                <span className="text-sm text-muted-foreground">
                  {userLikedBlog ? 'You liked this' : 'Click to like'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </div>
            </div>
          </article>

          {/* Comments Section - Anyone can comment */}
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <MessageCircle size={24} className="text-accent" />
              Discussion ({comments.length})
            </h2>

            {/* Comment Form - No login required */}
            <div className="bg-card rounded-xl p-6 mb-10 border shadow-sm">
              <h3 className="font-semibold mb-4">Leave a comment</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name *"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                />
                
                <textarea
                  placeholder="Write your comment... *"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-3 bg-background resize-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                />
                
                <div className="flex justify-end">
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim() || !commenterName.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2 gradient-accent rounded-lg text-accent-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.slice(0, visibleComments).map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold flex-shrink-0">
                      {comment.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{comment.user_name}</h4>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {comments.length === 0 && (
                <div className="text-center py-16 bg-card rounded-xl border">
                  <MessageCircle size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              )}

              {/* Load More Button */}
              {visibleComments < comments.length && (
                <div className="text-center pt-6">
                  <button
                    onClick={loadMoreComments}
                    className="px-6 py-3 border rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Load More Comments ({comments.length - visibleComments} remaining)
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;