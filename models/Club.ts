import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const ClubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    logoUrl: {
      type: String,
    },

    bannerUrl: {
      type: String,
    },

    instagram: {
      type: String,
    },

    linkedin: {
      type: String,
    },

     website: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,

      enum: [
        "pending",
        "approved",
        "rejected",
      ],

      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Club =
  models.Club ||
  model("Club", ClubSchema);

export default Club;