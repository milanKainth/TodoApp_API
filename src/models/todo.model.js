import mongoose, { Schema } from "mongoose";

const todo = new Schema({
    title: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    ower: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
},
    {
        timestamps: true
    }
)


export const Todo = mongoose.model("Todo", todo)