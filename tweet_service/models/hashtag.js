import mongoose from "mongoose";

const hashtagSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

export default Hashtag;
