"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  slug: string;
};

const STORAGE_KEY = "schemesamjho-favorites";

export default function FavoriteButton({
  slug,
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const favorites: string[] = JSON.parse(stored);

        setSaved(favorites.includes(slug));
      }
    } catch {
      setSaved(false);
    }

    setReady(true);
  }, [slug]);

  function toggleFavorite() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      let favorites: string[] = [];

      if (stored) {
        favorites = JSON.parse(stored);

        if (!Array.isArray(favorites)) {
          favorites = [];
        }
      }

      if (favorites.includes(slug)) {
        favorites = favorites.filter(
          (item) => item !== slug
        );

        setSaved(false);
      } else {
        favorites = [...favorites, slug];

        setSaved(true);
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );

      window.dispatchEvent(
        new Event("favoritesChanged")
      );
    } catch {
      console.error(
        "Unable to update saved schemes."
      );
    }
  }

  if (!ready) {
    return (
      <button
        type="button"
        disabled
        className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-3 font-semibold text-purple-300"
      >
        ♡ Save Scheme
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`rounded-xl border px-5 py-3 font-semibold transition ${
        saved
          ? "border-purple-700 bg-purple-700 text-white hover:bg-purple-800"
          : "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
      }`}
    >
      {saved ? "♥ Saved" : "♡ Save Scheme"}
    </button>
  );
}