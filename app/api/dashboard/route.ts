import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import {connectDB} from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";

export async function GET() {

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

    // Find MongoDB user
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

    // EVENTS USER REGISTERED FOR
    const registeredEvents = await Event.find({
      attendees: user._id,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    // EVENTS USER CREATED
    const createdEvents = await Event.find({
      createdBy: user._id,
    })
      .populate("attendees", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      registeredEvents,
      createdEvents,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}