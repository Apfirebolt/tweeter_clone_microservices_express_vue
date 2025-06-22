import mongoose from "mongoose";

const followSchema = mongoose.Schema(
    {
        follow_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        followed_by_user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        started_following_at: {
            type: Date,
            default: Date.now,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a user can't follow the same person twice
followSchema.index({ follow_user_id: 1, followed_by_user_id: 1 }, { unique: true });

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
