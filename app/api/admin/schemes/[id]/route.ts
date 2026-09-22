import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("schemes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      scheme: data,
    });
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

    return NextResponse.json(
      { error: "Unable to load scheme." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("schemes")
      .update({
        name: body.name,
        slug: body.slug,
        category: body.category,
        short_description:
          body.short_description,
        description: body.description,
        benefits: body.benefits ?? [],
        documents: body.documents ?? [],
        occupations: body.occupations ?? [],
        exclusions: body.exclusions ?? [],
        min_age: body.min_age ?? null,
        max_age: body.max_age ?? null,
        max_income: body.max_income ?? null,
        eligibility_summary:
          body.eligibility_summary,
        last_verified: body.last_verified,
        official_url: body.official_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      scheme: data,
    });
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

    return NextResponse.json(
      { error: "Unable to update scheme." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const supabase = createSupabaseAdmin();

    const { error } = await supabase
      .from("schemes")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
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

    return NextResponse.json(
      { error: "Unable to delete scheme." },
      { status: 500 }
    );
  }
}