"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import { createClerkSupabaseClient } from "./supabase";

type SavedSchemeRow = {
  scheme_slug: string;
  created_at?: string | null;
};

type UseSavedSchemesReturn = {
  savedSlugs: string[];
  savedCount: number;
  loading: boolean;
  saving: string | null;
  error: string;
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => Promise<boolean>;
  saveScheme: (slug: string) => Promise<boolean>;
  removeScheme: (slug: string) => Promise<boolean>;
  refreshSavedSchemes: () => Promise<void>;
};

export function useSavedSchemes(): UseSavedSchemesReturn {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");

  /*
   * Load saved schemes from Supabase.
   */
  const refreshSavedSchemes = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user) {
      setSavedSlugs([]);
      setLoading(false);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const supabase = createClerkSupabaseClient(getToken);

      const { data, error: supabaseError } = await supabase
        .from("saved_schemes")
        .select("scheme_slug, created_at")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (supabaseError) {
        console.error(
          "Error loading saved schemes:",
          supabaseError
        );

        setError("Unable to load your saved schemes.");
        return;
      }

      const rows = (data ?? []) as SavedSchemeRow[];

      const slugs = rows
        .map((row) => row.scheme_slug)
        .filter(
          (slug): slug is string =>
            typeof slug === "string" && slug.trim().length > 0
        );

      setSavedSlugs(slugs);
    } catch (err) {
      console.error(
        "Error loading saved schemes:",
        err
      );

      setError(
        "Something went wrong while loading your saved schemes."
      );
    } finally {
      setLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn, user]);

  /*
   * Initial load.
   *
   * considers this data-fetching effect a valid external
   * synchronization case, so the rule is disabled only
   * for this specific effect.
   */

  useEffect(() => {
    let cancelled = false;

    async function loadInitialSavedSchemes() {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn || !user) {
        if (!cancelled) {
          setSavedSlugs([]);
          setLoading(false);
          setError("");
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const supabase = createClerkSupabaseClient(getToken);

        const { data, error: supabaseError } = await supabase
          .from("saved_schemes")
          .select("scheme_slug, created_at")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (cancelled) {
          return;
        }

        if (supabaseError) {
          console.error(
            "Error loading saved schemes:",
            supabaseError
          );

          setError("Unable to load your saved schemes.");
          return;
        }

        const rows = (data ?? []) as SavedSchemeRow[];

        const slugs = rows
          .map((row) => row.scheme_slug)
          .filter(
            (slug): slug is string =>
              typeof slug === "string" && slug.trim().length > 0
          );

        setSavedSlugs(slugs);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Error loading saved schemes:",
          err
        );

        setError(
          "Something went wrong while loading your saved schemes."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialSavedSchemes();

    return () => {
      cancelled = true;
    };
  }, [getToken, isLoaded, isSignedIn, user]);
  

  /*
   * Check whether a scheme is saved.
   */
  const isSaved = useCallback(
    (slug: string): boolean => {
      return savedSlugs.includes(slug);
    },
    [savedSlugs]
  );

  /*
   * Save a scheme.
   */
  const saveScheme = useCallback(
    async (slug: string): Promise<boolean> => {
      if (!isLoaded || !isSignedIn || !user) {
        setError("Please sign in to save schemes.");
        return false;
      }

      if (!slug || saving) {
        return false;
      }

      try {
        setSaving(slug);
        setError("");

        // Optimistic UI update
        setSavedSlugs((current) => {
          if (current.includes(slug)) {
            return current;
          }

          return [slug, ...current];
        });

        const supabase = createClerkSupabaseClient(getToken);

        const { error: supabaseError } = await supabase
          .from("saved_schemes")
          .upsert(
            {
              user_id: user.id,
              scheme_slug: slug,
            },
            {
              onConflict: "user_id,scheme_slug",
            }
          );

        if (supabaseError) {
          console.error(
            "Error saving scheme:",
            supabaseError
          );

          // Roll back optimistic update
          setSavedSlugs((current) =>
            current.filter((item) => item !== slug)
          );

          setError("Unable to save this scheme.");
          return false;
        }

        return true;
      } catch (err) {
        console.error(
          "Error saving scheme:",
          err
        );

        // Roll back optimistic update
        setSavedSlugs((current) =>
          current.filter((item) => item !== slug)
        );

        setError(
          "Something went wrong while saving the scheme."
        );

        return false;
      } finally {
        setSaving(null);
      }
    },
    [getToken, isLoaded, isSignedIn, saving, user]
  );

  /*
   * Remove a scheme.
   */
  const removeScheme = useCallback(
    async (slug: string): Promise<boolean> => {
      if (!isLoaded || !isSignedIn || !user) {
        setError(
          "Please sign in to manage saved schemes."
        );

        return false;
      }

      if (!slug || saving) {
        return false;
      }

      try {
        setSaving(slug);
        setError("");

        const wasSaved = savedSlugs.includes(slug);

        // Optimistic UI update
        setSavedSlugs((current) =>
          current.filter((item) => item !== slug)
        );

        const supabase = createClerkSupabaseClient(getToken);

        const { error: supabaseError } = await supabase
          .from("saved_schemes")
          .delete()
          .eq("user_id", user.id)
          .eq("scheme_slug", slug);

        if (supabaseError) {
          console.error(
            "Error removing saved scheme:",
            supabaseError
          );

          // Restore if deletion failed
          if (wasSaved) {
            setSavedSlugs((current) => {
              if (current.includes(slug)) {
                return current;
              }

              return [slug, ...current];
            });
          }

          setError("Unable to remove this scheme.");
          return false;
        }

        return true;
      } catch (err) {
        console.error(
          "Error removing saved scheme:",
          err
        );

        setError(
          "Something went wrong while removing the scheme."
        );

        // Reload the actual database state
        await refreshSavedSchemes();

        return false;
      } finally {
        setSaving(null);
      }
    },
    [
      getToken,
      isLoaded,
      isSignedIn,
      refreshSavedSchemes,
      savedSlugs,
      saving,
      user,
    ]
  );

  /*
   * Toggle saved state.
   */
  const toggleSaved = useCallback(
    async (slug: string): Promise<boolean> => {
      if (savedSlugs.includes(slug)) {
        return removeScheme(slug);
      }

      return saveScheme(slug);
    },
    [removeScheme, saveScheme, savedSlugs]
  );

  return {
    savedSlugs,
    savedCount: savedSlugs.length,
    loading,
    saving,
    error,
    isSaved,
    toggleSaved,
    saveScheme,
    removeScheme,
    refreshSavedSchemes,
  };
}

export default useSavedSchemes;