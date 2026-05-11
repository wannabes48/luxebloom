const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://folzzfamsofrvusqwzof.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHp6ZmFtc29mcnZ1c3F3em9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTIxOTgsImV4cCI6MjA5Mzk4ODE5OH0.KYIYW-6tg5_COBpAszXcDLYAK4NdaXm790K61HjPiCo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDuplicates() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error(error);
    return;
  }
  
  const slugs = data.map(c => c.slug);
  const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  
  console.log('All Slugs:', slugs);
  console.log('Duplicates:', duplicates);
  console.table(data);
}

checkDuplicates();
