-- ============================================
-- LUXE BLOOM — Advanced Performance Optimization
-- Adding Role to JWT Claims for Instant RLS
-- ============================================

-- 1. Create a trigger function to sync profile role to auth.users.app_metadata
-- This makes the role available in the JWT claims
CREATE OR REPLACE FUNCTION public.sync_role_to_metadata()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = 
    coalesce(raw_app_meta_data, '{}'::jsonb) || 
    jsonb_build_object('role', NEW.role)
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger on the profiles table
DROP TRIGGER IF EXISTS on_profile_role_updated ON public.profiles;
CREATE TRIGGER on_profile_role_updated
  AFTER INSERT OR UPDATE OF role ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION sync_role_to_metadata();

-- 3. Update existing users (one-time sync)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id, role FROM public.profiles LOOP
    UPDATE auth.users
    SET raw_app_meta_data = 
      coalesce(raw_app_meta_data, '{}'::jsonb) || 
      jsonb_build_object('role', r.role)
    WHERE id = r.id;
  END LOOP;
END;
$$;

-- 4. Optimize the is_admin() function to check the JWT first (Fastest)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- First try to get it from the JWT (no DB hit)
  IF (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' THEN
    RETURN TRUE;
  END IF;

  -- Fallback to DB check if metadata is missing (safest)
  RETURN (
    SELECT role = 'admin'
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
