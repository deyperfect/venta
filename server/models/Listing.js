const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["gamingpc", "processor", "graphics card", "motherboard", "ram", "storage", "cooler", "power supply", "case"],
    },
    title: {
      type: String,
      required: [true, "Listing title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
    },
    description: {
      type: String,
      required: [true, "Listing description is required"],
      minlength: [10, "Listing description is too short"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["new", "used"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      select: false, 
    },
    dealMethod: {
        type: String,
        enum: ["shipping", "meetup"],
        required: [true, "Deal Method is required"],
    },
    photos: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (photos) => photos.length >= 1 && photos.length <= 10,
          message: "Listing must have between 1 and 10 photos",
        },
        {
          validator: (photos) => photos.every((url) => url.startsWith("https://")),
          message: "All photo URLs must be secure (https)",
        },
      ],
    },
    videoProof: {
      type: String,
      required: [true, "Video proof is required"],
      validate: {
        validator: (video) => video.startsWith("https://"),
        message: "Video URL must be secure (https)",
      },
    },
    status: {
      type: String,
      enum: ["pending", "available", "reserved", "sold", "suspended"],
      default: "pending",
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldAt: {
      type: Date,
      default: null,
    },
    reservedAt: {
      type: Date,
      default: null,
    },
    suspendedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

listingSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    const now = new Date();
    if (this.status === "sold") this.soldAt = now;
    if (this.status === "reserved") this.reservedAt = now;
    if (this.status === "suspended") this.suspendedAt = now;
    if (this.status === "available") this.reservedAt = null;
  }
  next();
});

listingSchema.index({ userId: 1 });
listingSchema.index({ category: 1, status: 1 });
listingSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Listing", listingSchema);