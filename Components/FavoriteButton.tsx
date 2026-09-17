"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "../lib/supabase";

type FavoriteButtonProps = {
  slug: string;
};

export default function FavoriteButton({
  slug,
}: FavoriteButtonProps) {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user } = useUser();

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * Check whether this scheme is already saved
   */
  useEffect(() => {
    async function checkSaved() {
      if (!isLoaded || !isSignedIn || !user) {
        setSaved(false);
        return;
      }

      try {
        const supabase =
          createClerkSupabaseClient(getToken);

        const { data, error } = await supabase
          .from("saved_schemes")
          .select("id")
          .eq("user_id", user.id)
          .eq("scheme_slug", slug)
          .maybeSingle();

        if (error) {
          console.error(
            "Error checking saved scheme:",
            error
          );
          return;
        }

        setSaved(!!data);
      } catch (error) {
        console.error(
          "Error checking saved scheme:",
          error
        );
      }
    }

    checkSaved();
  }, [
    slug,
    isLoaded,
    isSignedIn,
    user,
    getToken,
  ]);

  /*
   * Save / remove scheme
   */
  async function handleSave() {
    if (
      !isLoaded ||
      !isSignedIn ||
      !user ||
      loading
    ) {
      return;
    }

    setLoading(true);

    try {
      const supabase =
        createClerkSupabaseClient(getToken);

      if (saved) {
        /*
         * Remove scheme
         */
        const { error } = await supabase
          .from("saved_schemes")
          .delete()
          .eq("user_id", user.id)
          .eq("scheme_slug", slug);

        if (error) {
          console.error(
            "Error removing saved scheme:",
            error
          );
          return;
        }

        setSaved(false);

        /*
         * Tell Navbar / Dashboard / other components
         * that the saved list has changed.
         */
        window.dispatchEvent(
          new Event("saved-schemes-changed")
        );
      } 
      else {
        /*
         * Save scheme
         */
        const { error } = await supabase
          .from("saved_schemes")
          .insert({
            user_id: user.id,
            scheme_slug: slug,
          });

        if (error) {
          console.error(
            "Error saving scheme:",
            error
          );
          return;
        }

        setSaved(true);

        /*
         * Tell Navbar / Dashboard / other components
         * that the saved list has changed.
         */
        window.dispatchEvent(
          new Event("saved-schemes-changed")
        );
      }
    } catch (error) {
      console.error(
        "Error updating saved scheme:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Loading state
   */
  if (!isLoaded) {
    return (
      <button
        type="button"
        disabled
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
      >
        Loading...
      </button>
    );
  }

  /*
   * Signed-out state
   */
  if (!isSignedIn) {
    return (
      <button
        type="button"
        disabled
        title="Sign in to save schemes"
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400"
      >
        ♡ Sign in to Save
      </button>
    );
  }

  /*
   * Signed-in state
   */
  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={loading}
      aria-label={
        saved
          ? "Remove scheme from saved schemes"
          : "Save scheme"
      }
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
        saved
          ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          : "border-gray-200 text-gray-700 hover:bg-gray-50"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {loading
        ? "Saving..."
        : saved
          ? "♥ Saved"
          : "♡ Save Scheme"}
    </button>
  );
}