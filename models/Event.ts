import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";
import "./Club";
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

    startTime: {
  type: String,
  required: true,
    },
endTime: {
  type: String,
  required: true,
},

registrationDeadline: {
  type: Date,
  required: true,
},

mode: {
  type: String,
  enum: ["online", "offline", "hybrid"],
  default: "offline",
},

status: {
  type: String,
  enum: ["upcoming", "completed", "cancelled"],
  default: "upcoming",
},

    imageUrl: {
      type: String,
    },

    category: {
      type: String,
      default: "General",
    },

    club: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Club",
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