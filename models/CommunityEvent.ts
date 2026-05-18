import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const CommunityEventSchema = new Schema(
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

eventStatus: {
  type: String,
  enum: ["upcoming", "completed", "cancelled"],
  default: "upcoming",
},
    imageUrl: {
      type: String,
    },

    category: {
      type: String,
      default: "Community",
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

    status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},

  },
  {
    timestamps: true,
  }
);

const CommunityEvent =
  models.CommunityEvent ||
  model(
    "CommunityEvent",
    CommunityEventSchema
  );

export default CommunityEvent;