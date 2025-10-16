import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, ThumbsUp, Search, Shield } from "lucide-react";
import { supabase, Question, NewQuestion, Reply, NewReply } from "@/lib/supabase";

const QA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [likedQuestions, setLikedQuestions] = useState<Set<string>>(new Set());
  const [liking, setLiking] = useState<Set<string>>(new Set());

  // Fetch questions from Supabase
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching questions:', error);
        alert('Error loading questions. Please try again.');
        return;
      }

      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error loading questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handler for posting anonymous questions
  const handlePostQuestion = async () => {
    // Basic validation
    if (!questionTitle.trim()) {
      alert("Please enter a question title.");
      return;
    }
    
    if (!questionDescription.trim()) {
      alert("Please provide a description for your question.");
      return;
    }
    
    if (!selectedCategory) {
      alert("Please select a category for your question.");
      return;
    }

    try {
      setSubmitting(true);
      
      const newQuestion: NewQuestion = {
        title: questionTitle.trim(),
        description: questionDescription.trim(),
        category: selectedCategory
      };

      const { data, error } = await supabase
        .from('questions')
        .insert([newQuestion])
        .select()
        .single();

      if (error) {
        console.error('Error posting question:', error);
        alert('Error posting question. Please try again.');
        return;
      }

      // Show success message
      alert("Your question has been posted anonymously! It will appear in the community after moderation.");

      // Reset form
      setQuestionTitle("");
      setQuestionDescription("");
      setSelectedCategory("");

      // Refresh questions list
      await fetchQuestions();
    } catch (error) {
      console.error('Error posting question:', error);
      alert('Error posting question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Helper function to generate anonymous IP hash
  const generateIPHash = () => {
    // In a real app, you'd get the user's IP and hash it
    // For demo purposes, we'll use a simple localStorage-based identifier
    let userHash = localStorage.getItem('pride-haven-anon-hash');
    if (!userHash) {
      userHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('pride-haven-anon-hash', userHash);
    }
    return userHash;
  };

  // Handle liking a question
  const handleLikeQuestion = async (questionId: string) => {
    if (likedQuestions.has(questionId)) {
      alert("You've already liked this question!");
      return;
    }

    try {
      setLiking(prev => new Set(prev).add(questionId));
      
      const userHash = generateIPHash();
      
      // Check if user already liked this question
      const { data: existingLike } = await supabase
        .from('question_upvotes')
        .select('id')
        .eq('question_id', questionId)
        .eq('user_ip_hash', userHash)
        .single();

      if (existingLike) {
        alert("You've already liked this question!");
        setLiking(prev => {
          const newSet = new Set(prev);
          newSet.delete(questionId);
          return newSet;
        });
        return;
      }

      // Add the like
      const { error } = await supabase
        .from('question_upvotes')
        .insert([{
          question_id: questionId,
          user_ip_hash: userHash
        }]);

      if (error) {
        console.error('Error liking question:', error);
        alert('Error liking question. Please try again.');
        return;
      }

      // Update local state
      setLikedQuestions(prev => new Set(prev).add(questionId));
      
      // Update the question's upvote count
      const question = questions.find(q => q.id === questionId);
      if (question) {
        setQuestions(prev => prev.map(q => 
          q.id === questionId 
            ? { ...q, upvotes_count: q.upvotes_count + 1 }
            : q
        ));
      }

    } catch (error) {
      console.error('Error liking question:', error);
      alert('Error liking question. Please try again.');
    } finally {
      setLiking(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  // Handle posting a reply
  const handlePostReply = async () => {
    if (!selectedQuestion || !replyContent.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      setSubmittingReply(true);
      
      const newReply: NewReply = {
        question_id: selectedQuestion.id,
        content: replyContent.trim()
      };

      const { error } = await supabase
        .from('replies')
        .insert([newReply]);

      if (error) {
        console.error('Error posting reply:', error);
        alert('Error posting reply. Please try again.');
        return;
      }

      // Update the question's reply count
      setQuestions(prev => prev.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, replies_count: q.replies_count + 1 }
          : q
      ));

      // Reset form
      setReplyContent("");
      setSelectedQuestion(null);
      
      alert("Your reply has been posted!");

    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Error posting reply. Please try again.');
    } finally {
      setSubmittingReply(false);
    }
  };

  const categories = ["All", "Coming Out", "Support", "Trans Issues", "Community", "Mental Health"];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Anonymous Q&A
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ask questions, share experiences, and support others in a safe, moderated space. Everything here is anonymous and confidential.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Your identity is protected. No personal information is collected or shared.</span>
          </div>
        </div>

        {/* New Question Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Ask a Question</CardTitle>
            <CardDescription>
              Get support from the community. Your question will be posted anonymously.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Question title (e.g., 'How do I come out to my family?')" 
              className="text-lg"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <Textarea 
              placeholder="Provide more details about your question or situation..."
              className="min-h-[120px]"
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button 
                className="bg-primary hover:bg-primary/90 sm:ml-auto"
                onClick={handlePostQuestion}
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Post Question Anonymously"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary whitespace-nowrap"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <Card className="border-2 border-dashed border-muted-foreground/25">
              <CardContent className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground">Be the first to ask a question and help build our community!</p>
              </CardContent>
            </Card>
          ) : (
            questions.map((q) => (
              <Card key={q.id} className="border-2 hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{q.title}</CardTitle>
                      <CardDescription className="text-base">{q.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{q.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setSelectedQuestion(q)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{q.replies_count} replies</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Reply to Question</DialogTitle>
                          <DialogDescription>
                            {q.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Textarea
                            placeholder="Share your thoughts, experiences, or advice..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[120px]"
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handlePostReply}
                            disabled={submittingReply}
                          >
                            {submittingReply ? "Posting..." : "Post Reply"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center gap-2 ${
                        likedQuestions.has(q.id) 
                          ? "text-primary hover:text-primary/80" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => handleLikeQuestion(q.id)}
                      disabled={liking.has(q.id)}
                    >
                      <ThumbsUp className={`w-4 h-4 ${likedQuestions.has(q.id) ? "fill-current" : ""}`} />
                      <span>{q.upvotes_count} helpful</span>
                      {liking.has(q.id) && <span className="text-xs">...</span>}
                    </Button>
                    
                    <span className="ml-auto text-muted-foreground">{getTimeAgo(q.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Guidelines */}
        <Card className="mt-12 bg-muted/50">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be respectful and supportive of all community members</li>
              <li>• Keep discussions focused on helping and supporting others</li>
              <li>• Report any concerning content or behavior to moderators</li>
              <li>• Remember that everyone is anonymous - focus on the message, not the person</li>
              <li>• If you're in crisis, please contact a crisis helpline immediately</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default QA;
