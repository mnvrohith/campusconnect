import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";

import User from "@/models/User";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { userId } =
      await auth();

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

    const body =
      await req.json();

    const { status } = body;

    if (
      ![
        "completed",
        "cancelled",
      ].includes(status)
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid status",
        },
        {
          status: 400,
        }
      );

    }

    await connectDB();

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

    const event =
      await Event.findById(id);

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

    /* ONLY CREATOR */
    if (
      event.createdBy.toString() !==
      dbUser._id.toString()
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Not allowed",
        },
        {
          status: 403,
        }
      );

    }

    event.status = status;

    await event.save();

    return NextResponse.json({
      success: true,
      message:
        `Event marked as ${status}`,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );

  }

}