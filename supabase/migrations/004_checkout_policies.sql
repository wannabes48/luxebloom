-- Allow public inserts for orders
CREATE POLICY "Allow public inserts for orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Allow public inserts for order_items
CREATE POLICY "Allow public inserts for order_items" 
ON public.order_items FOR INSERT 
WITH CHECK (true);
