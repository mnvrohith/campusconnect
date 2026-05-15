import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Club from "@/models/Club";

export async function POST(req: Request) {

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

    // if (
    //   user.role !== "user" &&
    //   user.role !== "admin"
    // ) {

    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Only club admins can create clubs",
    //     },
    //     { status: 403 }
    //   );

    // }

    const body = await req.json();

    const club = await Club.create({
      ...body,
      createdBy: user._id,
      owner: user._id,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      club,
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