import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        fullName: {
            type: String,
            required: [true,"Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: [true,"Email is required"]
        },
        phoneNo: {
            type: String
        },
        password:{
            type:String,
            required:[true,"Password is required"]            
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

userSchema.methods.generateAccessToken = async function (){
    return await jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function (){
    return await jwt.sign(
        {
            _id: this._id          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)