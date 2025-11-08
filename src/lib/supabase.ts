import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🔍 Debug logları
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey ? "✅ Loaded" : "❌ Missing");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FeedbackForm {
  cinsiyet: string;
  fabrika: string;
  urun_ismi: string;
  memnuniyet: boolean;
  notlar?: string;
}
