-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    replies_count INTEGER DEFAULT 0,
    upvotes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create replies table
CREATE TABLE IF NOT EXISTS replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    upvotes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create upvotes table for questions
CREATE TABLE IF NOT EXISTS question_upvotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    user_ip_hash TEXT, -- For anonymous tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(question_id, user_ip_hash)
);

-- Create upvotes table for replies
CREATE TABLE IF NOT EXISTS reply_upvotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reply_id UUID REFERENCES replies(id) ON DELETE CASCADE,
    user_ip_hash TEXT, -- For anonymous tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(reply_id, user_ip_hash)
);

-- Enable Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reply_upvotes ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Allow anonymous read access to questions" ON questions
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to questions" ON questions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to replies" ON replies
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to replies" ON replies
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to question_upvotes" ON question_upvotes
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to question_upvotes" ON question_upvotes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous read access to reply_upvotes" ON reply_upvotes
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to reply_upvotes" ON reply_upvotes
    FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_replies_question_id ON replies(question_id);
CREATE INDEX IF NOT EXISTS idx_replies_created_at ON replies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_question_upvotes_question_id ON question_upvotes(question_id);
CREATE INDEX IF NOT EXISTS idx_reply_upvotes_reply_id ON reply_upvotes(reply_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_replies_updated_at BEFORE UPDATE ON replies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO questions (title, description, category) VALUES
('How do I come out to my parents?', 'I''m 16 and want to come out to my parents but I''m scared they won''t accept me. How should I approach this conversation?', 'Coming Out'),
('Resources for trans youth?', 'Looking for resources about transitioning and finding supportive doctors in my area. Any recommendations?', 'Trans Issues'),
('Dealing with school bullying', 'I''m being bullied at school for being gay. What can I do to protect myself and get help?', 'Support'),
('Finding LGBTQ+ friends', 'I don''t know any other LGBTQ+ people my age. How can I meet people and build a supportive community?', 'Community');
