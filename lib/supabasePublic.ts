import { createClient } from "@supabase/supabase-js";

export function createSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );
  }

  if (!publishableKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing."
    );
  }

  return createClient(
    url,
    publishableKey
  );
}