import { createSupabasePublic } from "./supabasePublic";
import type { Scheme } from "../data/schemes";

type DatabaseScheme = {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  short_description: string;
  description: string;
  benefits: string[];
  documents: string[];
  occupations: string[];
  exclusions: string[];
  min_age: number | null;
  max_age: number | null;
  max_income: number | null;
  eligibility_summary: string;
  last_verified: string;
  official_url: string;
  created_at: string;
  updated_at: string;
};

function databaseSchemeToScheme(
  scheme: DatabaseScheme
): Scheme {
  return {
    name: scheme.name,
    slug: scheme.slug,
    category: scheme.category,

    shortDescription:
      scheme.short_description,

    description:
      scheme.description,

    benefits:
      Array.isArray(scheme.benefits)
        ? scheme.benefits
        : [],

    documents:
      Array.isArray(scheme.documents)
        ? scheme.documents
        : [],

    occupations:
      Array.isArray(scheme.occupations)
        ? scheme.occupations
        : [],

    exclusions:
      Array.isArray(scheme.exclusions)
        ? scheme.exclusions
        : [],

    minAge:
      scheme.min_age ?? undefined,

    maxAge:
      scheme.max_age ?? undefined,

    maxIncome:
      scheme.max_income,

    eligibilitySummary:
      scheme.eligibility_summary,

    lastVerified:
      scheme.last_verified,

    officialUrl:
      scheme.official_url,
  };
}

/* =========================================================
   GET ALL PUBLISHED SCHEMES
========================================================= */

export async function getAllSchemes(): Promise<Scheme[]> {
  try {
    const supabase =
      createSupabasePublic();

    const {
      data,
      error,
    } = await supabase
      .from("schemes")
      .select(
        "id,name,slug,category,status,short_description,description,benefits,documents,occupations,exclusions,min_age,max_age,max_income,eligibility_summary,last_verified,official_url,created_at,updated_at"
      )
      .eq(
        "status",
        "published"
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      console.error(
        "Unable to load published schemes:",
        error
      );

      return [];
    }

    return (
      (data ?? []) as DatabaseScheme[]
    ).map(
      databaseSchemeToScheme
    );
  } catch (error) {
    console.error(
      "Unexpected scheme loading error:",
      error
    );

    return [];
  }
}

/* =========================================================
   GET ONE PUBLISHED SCHEME
========================================================= */

export async function getSchemeBySlug(
  slug: string
): Promise<Scheme | undefined> {
  try {
    const supabase =
      createSupabasePublic();

    const {
      data,
      error,
    } = await supabase
      .from("schemes")
      .select(
        "id,name,slug,category,status,short_description,description,benefits,documents,occupations,exclusions,min_age,max_age,max_income,eligibility_summary,last_verified,official_url,created_at,updated_at"
      )
      .eq(
        "slug",
        slug
      )
      .eq(
        "status",
        "published"
      )
      .maybeSingle();

    if (error) {
      console.error(
        "Unable to load published scheme:",
        error
      );

      return undefined;
    }

    if (!data) {
      return undefined;
    }

    return databaseSchemeToScheme(
      data as DatabaseScheme
    );
  } catch (error) {
    console.error(
      "Unexpected scheme loading error:",
      error
    );

    return undefined;
  }
}