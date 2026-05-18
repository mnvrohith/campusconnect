import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import CommunityEvent from "@/models/CommunityEvent";

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

    const { id } =
      await context.params;

    await connectDB();

    /* FIND USER */
    const dbUser =
      await User.findOne({
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

    /* FIND EVENT */
    const event =
      await CommunityEvent.findById(id);

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

    /* APPROVAL CHECK */
    if (event.status !== "approved") {

      return NextResponse.json(
        {
          success: false,
          message: "Event is not approved yet",
        },
        {
          status: 400,
        }
      );

    }

    /* EVENT COMPLETED */
    if (
      event.eventStatus ===
      "completed"
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "This event has already been completed.",
        },
        {
          status: 400,
        }
      );

    }

    /* EVENT CANCELLED */
    if (
      event.eventStatus ===
      "cancelled"
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "This event was cancelled.",
        },
        {
          status: 400,
        }
      );

    }

    /* REGISTRATION DEADLINE */
    if (
      event.registrationDeadline &&
      new Date() >
      new Date(
        event.registrationDeadline
      )
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Registration deadline has ended.",
        },
        {
          status: 400,
        }
      );

    }

    /* PREVENT OWNER RSVP */
    if (
      event.createdBy.toString() ===
      dbUser._id.toString()
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "You created this event",
        },
        {
          status: 400,
        }
      );

    }

    /* PREVENT DUPLICATE RSVP */
    const alreadyRegistered =
      event.attendees.includes(
        dbUser._id
      );

    if (alreadyRegistered) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Already registered",
        },
        {
          status: 400,
        }
      );

    }

    /* ADD ATTENDEE */
    event.attendees.push(
      dbUser._id
    );

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