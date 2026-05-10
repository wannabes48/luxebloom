-- ============================================
-- LUXE BLOOM — Admin Roles & Advanced Security
-- ============================================

-- 1. Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin'));

-- 2. Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 3. Update RLS for profiles: Admins can see ALL profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 4. Update RLS for orders: Admins can see ALL orders
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 5. Update RLS for orders: Admins can update order status
CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- 6. Update RLS for products: Admins can manage everything
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
