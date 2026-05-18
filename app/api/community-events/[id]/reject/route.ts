import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import CommunityEvent from "@/models/CommunityEvent";

import User from "@/models/User";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
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

    await connectDB();

    const dbUser = await User.findOne({
      clerkId: userId,
    });

    if (!dbUser || dbUser.role !== "admin") {

      return NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        {
          status: 403,
        }
      );

    }

    const { id } = await context.params;

    const event =
      await CommunityEvent.findById(id);

    if (!event) {

      return NextResponse.json(
        {
          success: false,
          message: "Community event not found",
        },
        {
          status: 404,
        }
      );

    }

    event.status = "rejected";

    await event.save();

    return NextResponse.json({
      success: true,
      message:
        "Community event rejected",
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