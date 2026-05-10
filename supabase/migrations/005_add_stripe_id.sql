-- Add stripe_payment_id to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS stripe_payment_id TEXT;
