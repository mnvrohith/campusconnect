import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";

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

    const {
      title,
      description,
      location,
      date,
      imageUrl,
      category,
    } = body;

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
      title,
      description,
      location,
      date,
      imageUrl,
      category,
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