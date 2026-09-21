"use client";

import { Bookmark } from "lucide-react";
import { useSavedSchemesContext } from "../lib/SavedSchemesContext";

type FavoriteButtonProps = {
  slug: string;
  label?: boolean;
};

export default function FavoriteButton({
  slug,
  label = true,
}: FavoriteButtonProps) {
  const {
    isSaved,
    toggleSaved,
    saving,
  } = useSavedSchemesContext();

  const saved = isSaved(slug);
  const loading = saving === slug;

  async function handleToggle() {
    if (loading) {
      return;
    }

    await toggleSaved(slug);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      aria-label={
        saved
          ? "Remove scheme from saved schemes"
          : "Save scheme"
      }
      aria-pressed={saved}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
        saved
          ? "bg-[#16A34A] text-[#FFFFFF] hover:bg-[#111827]"
          : "bg-[#2563EB] text-[#FFFFFF] hover:bg-[#111827]"
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <Bookmark
        size={17}
        fill={saved ? "currentColor" : "none"}
      />

      {label && (
        <span>
          {loading
            ? "Saving..."
            : saved
              ? "Saved"
              : "Save Scheme"}
        </span>
      )}
    </button>
  );
}