
import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/auth";
import { createAdminClient } from "../../../../lib/supabase/admin";

const allowedStatuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Completed",
];

export async function PATCH(request, { params }) {
  try {
    const session = await getSession();

    if (!session || session.role !== "guide") {
      return NextResponse.json(
        { error: "Only the trip guide can update request status." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ||
      !allowedStatuses.includes(body.status)
    ) {
      return NextResponse.json(
        { error: "Invalid request ID or status." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("trip_requests")
      .update({ status: body.status })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Trip status update failed:", error.message);
      return NextResponse.json(
        { error: "Could not update trip status." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Trip request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request: data });
  } catch (error) {
    console.error("Trip status update failed:", error.message);
    return NextResponse.json(
      { error: "Could not update trip status." },
      { status: 500 }
    );
  }
}
