-- SQL to add new categories to the Luxe Bloom database
-- Run this in the Supabase SQL Editor

INSERT INTO categories (name, slug, description, icon, sort_order, is_active)
VALUES 
('Birthday', 'birthday', 'Celebrate their special day with our premium birthday collections', '🎂', 7, true),
('Love & Romance', 'love-romance', 'Express your deepest feelings with romantic arrangements', '❤️', 8, true),
('Newborn', 'newborn', 'Welcome the little one with our gentle and beautiful bouquets', '👶', 9, true),
('Occasions', 'occasions', 'Find the perfect arrangement for any celebration or milestone', '🎉', 10, true)
ON CONFLICT (slug) DO UPDATE 
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;
