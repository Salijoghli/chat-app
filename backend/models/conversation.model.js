import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === "text";
      },
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "audio"],
      default: "text",
    },
    media: {
      url: { type: String }, // Media file URL
      publicId: { type: String }, // Cloud storage public ID
      fileType: { type: String }, // MIME type (e.g., image/png)
      fileName: { type: String }, // Original file name
      fileSize: { type: Number }, // File size in bytes
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reaction: { type: String }, // Emoji or reaction text
      },
    ],
  },
  { timestamps: true }
);

// Indexes for efficient querying
messageSchema.index({ conversationId: 1, createdAt: 1 }); // For pagination
messageSchema.index({ conversationId: 1, isPinned: 1 }); // For fetching pinned messages
messageSchema.index({ senderId: 1 }); // For sender-specific queries

const Message = mongoose.model("Message", messageSchema);
export default Message;
