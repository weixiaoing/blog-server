import mongoose from "@/config/db";
const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: "string",
      enum: ["unreviewd", "approved", "rejected"],
      default: "unreviewd",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Meeting", meetingSchema, "meeting");
