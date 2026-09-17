"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "./supabase";

type SavedScheme = {
  slug: string;
  createdAt: string;
};

const SAVED_SCHEMES_CHANGED = "saved-schemes-changed";

export function useSavedSchemes() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const [savedSchemes, setSavedSchemes] = useState<SavedScheme[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedSchemes = useCallback(async () => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setSavedSchemes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const supabase = createClerkSupabaseClient(getToken);

      const { data, error } = await supabase
        .from("saved_schemes")
        .select("scheme_slug, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading saved schemes:", error);
        return;
      }

      setSavedSchemes(
        (data ?? []).map((item) => ({
          slug: item.scheme_slug,
          createdAt: item.created_at,
        }))
      );
    } catch (error) {
      console.error("Error loading saved schemes:", error);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  useEffect(() => {
    loadSavedSchemes();
  }, [loadSavedSchemes]);

  /*
   * Listen for changes made by FavoriteButton,
   * Saved page, Dashboard, etc.
   */
  useEffect(() => {
    function handleSavedSchemesChanged() {
      loadSavedSchemes();
    }

    window.addEventListener(
      SAVED_SCHEMES_CHANGED,
      handleSavedSchemesChanged
    );

    return () => {
      window.removeEventListener(
        SAVED_SCHEMES_CHANGED,
        handleSavedSchemesChanged
      );
    };
  }, [loadSavedSchemes]);

  const removeScheme = useCallback(
    async (slug: string) => {
      if (!user) return false;

      try {
        const supabase = createClerkSupabaseClient(getToken);

        const { error } = await supabase
          .from("saved_schemes")
          .delete()
          .eq("user_id", user.id)
          .eq("scheme_slug", slug);

        if (error) {
          console.error("Error removing saved scheme:", error);
          return false;
        }

        setSavedSchemes((current) =>
          current.filter((scheme) => scheme.slug !== slug)
        );

        window.dispatchEvent(
          new Event(SAVED_SCHEMES_CHANGED)
        );

        return true;
      } catch (error) {
        console.error("Error removing saved scheme:", error);
        return false;
      }
    },
    [user, getToken]
  );

  return {
    savedSchemes,
    savedCount: savedSchemes.length,
    loading,
    refresh: loadSavedSchemes,
    removeScheme,
  };
}