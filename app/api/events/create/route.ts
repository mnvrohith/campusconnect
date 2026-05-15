import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";
import Club from "@/models/Club";

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

    const body = await req.json();

    const {
      title,
      description,
      location,
      date,
      imageUrl,
      category,
      club,
    } = body;

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

    /* ADMIN CHECK */
    if (user.role !== "admin") {

      return Response.json(
        {
          success: false,
          message: "Admins only",
        },
        { status: 403 }
      );

    }

    /* OPTIONAL CLUB VALIDATION */
    if (club) {

      const existingClub =
        await Club.findById(club);

      if (!existingClub) {

        return Response.json(
          {
            success: false,
            message: "Club not found",
          },
          { status: 404 }
        );

      }

    }

    const event = await Event.create({
      title,
      description,
      location,
      date,
      imageUrl,
      category,
      club,
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
        message: "Server Error",
      },
      { status: 500 }
    );

  }

}