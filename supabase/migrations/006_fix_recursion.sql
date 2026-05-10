-- ============================================
-- LUXE BLOOM — Fix RLS Policy Recursion
-- ============================================

-- 1. Create a helper function to check if the current user is an admin
-- SECURITY DEFINER allows this function to bypass RLS when checking the profiles table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- 3. Re-create policies using the is_admin() function
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE USING (is_admin());
