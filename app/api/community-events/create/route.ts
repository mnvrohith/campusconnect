import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import CommunityEvent from "@/models/CommunityEvent";

export async function POST(req: Request) {

  try {

    const { userId } = await auth();

    if (!userId) {

      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );

    }

    await connectDB();

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {

      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );

    }

    const body = await req.json();

    const {
      title,
      description,
      location,
      date,
      startTime,
      endTime,
      imageUrl,
      category,
    } = body;

    const event =
      await CommunityEvent.create({

        title,
        description,
        location,
        date,

        startTime,
        endTime,

        imageUrl,
        category,

        createdBy: user._id,

        status: "pending",
      });

    return Response.json({
      success: true,
      message:
        "Community event submitted for approval",
      event,
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