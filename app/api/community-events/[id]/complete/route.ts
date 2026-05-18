import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import CommunityEvent from "@/models/CommunityEvent";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const clerkUser = await currentUser();

    if (!clerkUser) {

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

    const user = await User.findOne({
      clerkId: clerkUser.id,
    });

    if (!user) {

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

    const { id } = await params;

    const event = await CommunityEvent.findById(id);

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

    if (
      event.createdBy.toString() !==
      user._id.toString()
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );

    }

    event.eventStatus = "completed";

    await event.save();

    return NextResponse.json({
      success: true,
      message: "Event marked as completed",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}