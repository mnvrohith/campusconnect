import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Club from "@/models/Club";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
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
        { status: 401 }
      );

    }

    const user = await User.findOne({
      clerkId: clerkUser.id,
    });

    if (user.role !== "admin") {

      return NextResponse.json(
        {
          success: false,
          message: "Admins only",
        },
        { status: 403 }
      );

    }

    const { id } = await context.params;

    await Club.findByIdAndUpdate(
      id,
      {
        status: "approved",
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );

  }

}