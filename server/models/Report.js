const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      enum: ["scam", "incorrect description", "other"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "dismissed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

reportSchema.index({ reporterId: 1, listingId: 1 }, { unique: true });

module.exports = mongoose.model("Report", reportSchema);
