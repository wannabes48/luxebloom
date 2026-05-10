-- ============================================
-- LUXE BLOOM — User Profiles & Auth Integration
-- ============================================

-- ---- Profiles Table ----
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT, -- Cloudinary URL
  billing_address JSONB DEFAULT '{}'::jsonb, -- Store US standard address fields
  shipping_address JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---- RLS Policies for Profiles ----
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profiles" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ---- Trigger: Handle New User Signup ----
-- This function automatically creates a profile entry when a user signs up via Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, display_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name', 
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'display_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ---- Link Orders to Profiles (Optional but Recommended) ----
-- Adding a user_id column to orders table to link them to authenticated users
ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
CREATE INDEX idx_orders_user ON orders(user_id);

-- Update RLS for orders to check for user_id
CREATE POLICY "Users can view their own orders via user_id"
  ON orders FOR SELECT USING (auth.uid() = user_id);

-- ---- Auto-update timestamp trigger for profiles ----
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
