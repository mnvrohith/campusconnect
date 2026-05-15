import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import Club from "@/models/Club";
import User from "@/models/User";



/* =========================
   GET APPROVED CLUBS
========================= */

export async function GET() {

  try {

    await connectDB();

    const clubs = await Club.find({
      status: "approved",
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      clubs,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch clubs",
      },
      {
        status: 500,
      }
    );

  }

}



/* =========================
   CREATE CLUB REQUEST
========================= */

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

    const body = await req.json();

    const {
      name,
      description,
      category,
      logoUrl,
      bannerUrl,
      instagram,
      linkedin,
      website,
    } = body;

    const existingClub = await Club.findOne({
      name,
    });

    if (existingClub) {

      return NextResponse.json(
        {
          success: false,
          message: "Club already exists",
        },
        {
          status: 400,
        }
      );

    }

    const club = await Club.create({

      name,
      description,
      category,
      logoUrl,
      bannerUrl,
      instagram,
      linkedin,
      website,
      createdBy: user._id,

      admins: [user._id],

      status: "pending",

    });

    return NextResponse.json({
      success: true,
      club,
      message: "Club request submitted successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create club",
      },
      {
        status: 500,
      }
    );

  }

}