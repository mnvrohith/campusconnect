import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";
import User from "@/models/User";

export async function GET() {

  try {

    await connectDB();

    const events = await Event.find()
      .populate(
        "createdBy",
        "name"
      )
       .populate("club", "name logoUrl")
  .sort({ createdAt: -1 });

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

export async function POST(req: Request) {

  try {

    const { userId } = await auth();

    if (!userId) {

      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const body = await req.json();

    await connectDB();

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {

      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );

    }

    const event = await Event.create({
      ...body,
      createdBy: user._id,
    });

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