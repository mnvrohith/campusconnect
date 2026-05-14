import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await context.params;

    await connectDB();

    const event = await Event.findById(id)
      .populate("createdBy", "name email imageUrl");

    if (!event) {

      return Response.json(
        { error: "Event not found" },
        { status: 404 }
      );

    }

    return Response.json({
      success: true,
      event,
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