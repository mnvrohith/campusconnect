import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    imageUrl: {
      type: String,
    },

    role: {
      type: String,
      enum: ["student", "club_admin", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const User =
  models.User || model("User", UserSchema);

export default User;