import { auth } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import Event from "@/models/Event";
import User from "@/models/User";

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await context.params;

    await connectDB();

    const event = await Event.findById(id)
      .populate(
        "createdBy",
        "name email imageUrl clerkId"
      );

    if (!event) {

      return Response.json(
        { error: "Event not found" },
        { status: 404 }
      );

    }

    return Response.json({
      success: true,
      event,
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

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { userId } = await auth();

    if (!userId) {

      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const { id } = await context.params;

    const body = await req.json();

    await connectDB();

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {

      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );

    }

    const event = await Event.findById(id);

    if (!event) {

      return Response.json(
        { error: "Event not found" },
        { status: 404 }
      );

    }

    if (
      String(event.createdBy)
      !== String(user._id)
    ) {

      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );

    }

    const updatedEvent =
      await Event.findByIdAndUpdate(
        id,
        body,
        { new: true }
      );

    return Response.json({
      success: true,
      updatedEvent,
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

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { userId } = await auth();

    if (!userId) {

      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const { id } = await context.params;

    await connectDB();

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {

      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );

    }

    const event = await Event.findById(id);

    if (!event) {

      return Response.json(
        { error: "Event not found" },
        { status: 404 }
      );

    }

    if (
      String(event.createdBy)
      !== String(user._id)
    ) {

      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );

    }

    await Event.findByIdAndDelete(id);

    return Response.json({
      success: true,
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