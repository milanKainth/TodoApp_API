import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ower: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
        timestamps: true
    }
)


export const Category = mongoose.model("Category", categorySchema)