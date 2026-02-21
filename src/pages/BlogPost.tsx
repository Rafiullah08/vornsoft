import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Heart, MessageCircle, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  content: string;
  user_name: string;
  created_at: string;
  likes: number;
  user_id: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [commenterEmail, setCommenterEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadPost();
    loadComments();
  }, [slug]);

  useEffect(() => {
    if (user) {
      loadUserLikes();
    }
  }, [comments, user]);

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
    if (!post?.id) return;
    
    const { data, error } = await supabase
      .from("blog_comments" as any)
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setComments(data as unknown as Comment[]);
    }
  };

  const loadUserLikes = async () => {
    if (!user || comments.length === 0) return;
    
    const commentIds = comments.map(c => c.id);
    const { data } = await supabase
      .from("comment_likes" as any)
      .select("comment_id")
      .eq("user_id", user.id)
      .in("comment_id", commentIds);
    
    const liked = new Set(Array.isArray(data) ? data.map((d: any) => d.comment_id) : []);
    setLikedComments(liked);
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    if (!commenterName.trim() && !user) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }

    const comment = {
      post_id: post.id,
      content: newComment,
      user_name: user ? user.email?.split('@')[0] || "User" : commenterName,
      user_email: user?.email || commenterEmail || null,
      user_id: user?.id || null,
    };

    const { error } = await supabase
      .from("blog_comments" as any)
      .insert(comment);

    if (error) {
      toast({ title: "Error posting comment", variant: "destructive" });
    } else {
      toast({ title: "Comment posted!" });
      setNewComment("");
      if (!user) setCommenterName("");
      loadComments();
    }
  };

  const handleLike = async (commentId: string) => {
    if (!user) {
      toast({ title: "Please login to like comments", variant: "destructive" });
      return;
    }

    const isLiked = likedComments.has(commentId);

    if (isLiked) {
      // Unlike
      await supabase
        .from("comment_likes" as any)
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);

      await supabase
        .from("blog_comments" as any)
        .update({ likes: comments.find(c => c.id === commentId)!.likes - 1 })
        .eq("id", commentId);

      likedComments.delete(commentId);
    } else {
      // Like
      await supabase
        .from("comment_likes" as any)
        .insert({ comment_id: commentId, user_id: user.id });

      await supabase
        .from("blog_comments" as any)
        .update({ likes: comments.find(c => c.id === commentId)!.likes + 1 })
        .eq("id", commentId);

      likedComments.add(commentId);
    }

    setLikedComments(new Set(likedComments));
    loadComments();
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-accent hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {post.featured_image && (
        <div className="w-full h-[400px] relative">
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <article className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {new Date(post.published_at || post.created_at).toLocaleDateString()}
              </span>
            </div>

            {post.content && (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </article>

          {/* Comments Section */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle size={24} /> Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <div className="bg-card rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4">Leave a comment</h3>
              
              {!user && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-background"
                  />
                  <input
                    type="email"
                    placeholder="Your email (optional)"
                    value={commenterEmail}
                    onChange={(e) => setCommenterEmail(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-background"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="flex-1 border rounded-lg px-3 py-2 bg-background resize-none"
                />
                <button
                  onClick={handleComment}
                  className="px-4 py-2 gradient-accent rounded-lg self-end"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg p-4 border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium">{comment.user_name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-1 text-sm ${
                        likedComments.has(comment.id) 
                          ? 'text-red-500' 
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart size={16} fill={likedComments.has(comment.id) ? 'currentColor' : 'none'} />
                      <span>{comment.likes || 0}</span>
                    </button>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                </motion.div>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;