import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  await requireAdmin();

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("schemes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ schemes: data });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("schemes")
      .insert({
        name: body.name,
        slug: body.slug,
        category: body.category,
        short_description:
          body.short_description,
        description: body.description,
        benefits: body.benefits ?? [],
        documents: body.documents ?? [],
        occupations:
          body.occupations ?? [],
        exclusions:
          body.exclusions ?? [],
        min_age: body.min_age ?? null,
        max_age: body.max_age ?? null,
        max_income:
          body.max_income ?? null,
        eligibility_summary:
          body.eligibility_summary,
        last_verified:
          body.last_verified,
        official_url:
          body.official_url,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        scheme: data,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create scheme.",
      },
      { status: 500 }
    );
  }
}