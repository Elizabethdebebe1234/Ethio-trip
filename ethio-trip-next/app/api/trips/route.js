
import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { createAdminClient } from "../../../lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      );
    }

    if (!["customer", "guide"].includes(session.role)) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    const supabase = createAdminClient();

    let query = supabase
      .from("trip_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (session.role === "customer") {
      query = query.eq("customer_email", session.username);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Trip request retrieval failed:", error.message);
      return NextResponse.json(
        { error: "Could not load trip requests." },
        { status: 500 }
      );
    }

    return NextResponse.json({ requests: data });
  } catch (error) {
    console.error("Trip request retrieval failed:", error.message);
    return NextResponse.json(
      { error: "Could not load trip requests." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "customer") {
      return NextResponse.json(
        { error: "Sign in as a customer to submit a trip request." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (
      !Array.isArray(body.destinations) ||
      body.destinations.length === 0 ||
      !body.startDate ||
      !body.endDate ||
      body.endDate <= body.startDate
    ) {
      return NextResponse.json(
        { error: "Provide destinations and valid travel dates." },
        { status: 400 }
      );
    }

    const budget = Number(body.estimatedBudget);
    const nights = Number(body.accommodationNights);

    if (
      !Number.isFinite(budget) ||
      budget < 0 ||
      !Number.isInteger(nights) ||
      nights < 1 ||
      nights > 365
    ) {
      return NextResponse.json(
        { error: "The budget or accommodation nights are invalid." },
        { status: 400 }
      );
    }

    const destinations = body.destinations.map((destination) => ({
      id: String(destination.id || ""),
      name: String(destination.name || ""),
      days: Number(destination.days),
    }));

    if (
      destinations.some(
        (destination) =>
          !destination.id ||
          !destination.name ||
          !Number.isInteger(destination.days) ||
          destination.days < 1
      )
    ) {
      return NextResponse.json(
        { error: "One or more destinations are invalid." },
        { status: 400 }
      );
    }

    const accommodation =
      typeof body.accommodation === "string"
        ? body.accommodation.slice(0, 150)
        : "Not selected";

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("trip_requests")
      .insert({
        customer_email: session.username,
        destinations,
        start_date: body.startDate,
        end_date: body.endDate,
        accommodation,
        accommodation_nights: nights,
        estimated_budget: budget,
        status: "Pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Trip request creation failed:", error.message);
      return NextResponse.json(
        { error: "Could not save your trip request." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, request: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trip request creation failed:", error.message);
    return NextResponse.json(
      { error: "Could not submit your trip request." },
      { status: 500 }
    );
  }
}
