const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [200, "Comment cannot exceed 200 characters"],
    },
  },
  { timestamps: true },
);

ratingSchema.index({ reviewerId: 1, listingId: 1 }, { unique: true });
ratingSchema.index({ sellerId: 1 });

module.exports = mongoose.model("Rating", ratingSchema);
