import { createClient } from "@supabase/supabase-js";

const supabse_url = import.meta.env.VITE_SUPABASE_URL
const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabse_url, supabase_anon_key)
