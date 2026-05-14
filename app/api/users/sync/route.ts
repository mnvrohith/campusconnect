import { auth, currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {

  try {

    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (existingUser) {
      return Response.json({
        success: true,
        user: existingUser,
      });
    }

    const newUser = await User.create({
      clerkId: userId,

      name:
        clerkUser.fullName ||
        clerkUser.firstName ||
        "User",

      email:
        clerkUser.emailAddresses[0]
          .emailAddress,

      imageUrl: clerkUser.imageUrl,

      role: "student",
    });

    return Response.json({
      success: true,
      user: newUser,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );

  }
}