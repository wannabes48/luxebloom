const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://folzzfamsofrvusqwzof.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHp6ZmFtc29mcnZ1c3F3em9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTIxOTgsImV4cCI6MjA5Mzk4ODE5OH0.KYIYW-6tg5_COBpAszXcDLYAK4NdaXm790K61HjPiCo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newCategories = [
  { name: "Birthday", slug: "birthday", description: "Celebrate their special day", icon: "🎂" },
  { name: "Love & Romance", slug: "love-romance", description: "Express your deepest feelings", icon: "❤️" },
  { name: "Newborn", slug: "newborn", description: "Welcome the little one", icon: "👶" },
  { name: "Occasions", slug: "occasions", description: "Celebrate every moment", icon: "🎉" },
];

async function addCategories() {
  console.log('Adding categories...');
  const { data, error } = await supabase.from('categories').insert(newCategories).select();
  if (error) {
    console.error('Error adding categories:', error.message);
    if (error.message.includes('permission denied')) {
      console.log('RLS might be blocking inserts. I will try to update existing ones if they match slugs.');
    }
    return;
  }
  console.log('Successfully added categories:', data);
}

addCategories();
