# Luxe Bloom — Supabase Connection Guide

Follow these steps to connect your local Next.js project to your Supabase instance.

## 1. Install Supabase Client
Run the following command in your terminal to install the necessary library:

```bash
npm install @supabase/supabase-js
```

## 2. Configure Environment Variables
Create a `.env.local` file in the root of your project (same level as `package.json`) and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

### Where to find these keys?
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Go to **Project Settings** (gear icon) > **API**.
4. Copy the **Project URL** and **anon public** key.

## 3. Initialize the Supabase Client
Create a new file at `src/lib/supabase.js` to initialize the client for use throughout the app:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 4. Set Up the Database
Apply the migration files provided in the `supabase/migrations` folder to your project:

1. Open the **SQL Editor** in the Supabase Dashboard.
2. Create a **New Query**.
3. Copy the contents of `supabase/migrations/001_initial_schema.sql` and run it.
4. Repeat for `supabase/migrations/002_user_profiles.sql`.

## 5. Connect the Auth Hook
Once the client is ready, update `src/hooks/useAuth.js` to use the real Supabase client:

```javascript
import { supabase } from "@/lib/supabase"

// Example signIn:
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})
```

## 6. Security (RLS)
Ensure you enable **Row Level Security** on all your tables in the Supabase dashboard. The migrations I provided already include the SQL to enable RLS and set up default policies.

---

### Important Note on Redirects
In your Supabase Dashboard, go to **Authentication > URL Configuration** and add your local development URL (usually `http://localhost:3000`) to the **Redirect URLs** list to ensure login redirects work correctly.
