import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'

const supabaseUrl = 'https://hyfqjkptbthkximpmsuw.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZnFqa3B0YnRoa3hpbXBtc3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5Njg0MDMsImV4cCI6MjAwNjU0NDQwM30.udDzUmGYX-i1Wuk96TK0kc4P2S6MuHUmek0OPVDVXI4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase