import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import {connectDB} from "@/lib/mongodb";

import Event from "@/models/Event";

import User from "@/models/User";

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { userId } = await auth();

    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const { id } = await context.params;

    await connectDB();

    // Find MongoDB user
    const dbUser = await User.findOne({
      clerkId: userId,
    });

    if (!dbUser) {

      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    }

    const event = await Event.findById(id);

    if (!event) {

      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        {
          status: 404,
        }
      );

    }

    // Prevent creator from registering
    if (
      event.createdBy.toString() ===
      dbUser._id.toString()
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "You created this event",
        },
        {
          status: 400,
        }
      );

    }

    // Prevent duplicate RSVP
    const alreadyRegistered =
      event.attendees.includes(dbUser._id);

    if (alreadyRegistered) {

      return NextResponse.json(
        {
          success: false,
          message: "Already registered",
        },
        {
          status: 400,
        }
      );

    }

    // Add attendee
    event.attendees.push(dbUser._id);

    await event.save();

    return NextResponse.json({
      success: true,
      message: "RSVP successful",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}