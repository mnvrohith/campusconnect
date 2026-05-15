import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import CommunityEvent from "@/models/CommunityEvent";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

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

    await connectDB();

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user || user.role !== "admin") {

      return Response.json(
        {
          success: false,
          message: "Admin only",
        },
        { status: 403 }
      );

    }

    await CommunityEvent.findByIdAndUpdate(
      params.id,
      {
        status: "approved",
      }
    );

    return Response.redirect(
      new URL(
        "/admin/community-events",
        req.url
      )
    );

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