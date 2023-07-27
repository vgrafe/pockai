import "react-native-url-polyfill/auto";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { SecureStoreAdapter } from "./secureStore";

const supabaseUrl = "https://zvbqsqdhofkwngnoumcp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YnFzcWRob2Zrd25nbm91bWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0MTk0NTAsImV4cCI6MjAwNTk5NTQ1MH0.oFm90JqRX6Aa0wpMLrvNKBoQ1Ws6w3z0RUYpMDirNbM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
