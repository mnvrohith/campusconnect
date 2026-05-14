import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";

export async function GET() {

  try {

    await connectDB();

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    return Response.json({
      success: true,
      events: JSON.parse(JSON.stringify(events)),
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );

  }

}