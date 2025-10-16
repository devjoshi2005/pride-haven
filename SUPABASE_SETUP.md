# Supabase Setup for Pride Haven Q&A

This guide will help you set up Supabase for the Pride Haven Q&A section.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `pride-haven` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose the closest to your users
5. Click "Create new project"

## Step 2: Set Up the Database Schema

1. In your Supabase project dashboard, go to the "SQL Editor"
2. Click "New Query"
3. Copy and paste the contents of `database-schema.sql` from this project
4. Click "Run" to execute the schema

This will create:
- `questions` table for storing Q&A questions
- `replies` table for storing replies to questions
- `question_upvotes` and `reply_upvotes` tables for anonymous voting
- Proper indexes and Row Level Security (RLS) policies
- Sample data

## Step 3: Get Your Project Credentials

1. In your Supabase project dashboard, go to "Settings" → "API"
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env` in your project root
2. Update the values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Q&A page
3. Try posting a question - it should save to your Supabase database
4. Check your Supabase dashboard to see the data

## Database Schema Overview

### Questions Table
- `id`: UUID primary key
- `title`: Question title
- `description`: Question description
- `category`: Question category
- `replies_count`: Number of replies (auto-calculated)
- `upvotes_count`: Number of upvotes (auto-calculated)
- `created_at`: Timestamp when created
- `updated_at`: Timestamp when last updated

### Security Features
- **Row Level Security (RLS)**: Enabled on all tables
- **Anonymous Access**: Users can read and create without authentication
- **Data Protection**: No personal information is collected
- **IP-based Voting**: Anonymous upvotes tracked by IP hash

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file exists and has the correct values
   - Restart your development server after adding environment variables

2. **"Error loading questions"**
   - Check that the database schema was created successfully
   - Verify your Supabase URL and API key are correct
   - Check the browser console for detailed error messages

3. **"Error posting question"**
   - Ensure the `questions` table exists in your database
   - Check that RLS policies allow anonymous inserts
   - Verify your API key has the correct permissions

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the browser console for error messages
- Check the Supabase dashboard for database logs

## Next Steps

Once basic functionality is working, you can extend the system with:
- Real-time updates using Supabase subscriptions
- Reply functionality
- Upvoting system
- Search and filtering
- Moderation features
- Analytics and reporting
