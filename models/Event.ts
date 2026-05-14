import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    category: {
      type: String,
      default: "General",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

     attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  },
  {
    timestamps: true,
  }
);

const Event =
  models.Event || model("Event", EventSchema);

export default Event;