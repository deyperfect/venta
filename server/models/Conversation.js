const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastMessage: {
      type: String,
      trim: true,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

conversationSchema.index({ listingId: 1, buyerId: 1 }, { unique: true });
conversationSchema.index({ buyerId: 1 });
conversationSchema.index({ sellerId: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
