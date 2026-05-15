import { connectDB } from "@/lib/mongodb";

import CommunityEvent from "@/models/CommunityEvent";

export async function GET() {

  try {

    await connectDB();

    const events =
      await CommunityEvent.find({
        status: "approved",
      })
        .populate("createdBy", "name")
        .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      events,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );

  }

}