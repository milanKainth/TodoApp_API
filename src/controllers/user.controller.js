import { asyncHandler } from "../utils/aysncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
/*
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.gernerateAccessToken();
        const refreshToken = user.gernerateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating the access token"
        );
    }
}
*/

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation 
    // check if user already exists
    // create user object - create entry in db
    // remove password and refresh tokn field from response
    // check for user creation 
    // return res
    const { userName, fullName, email, phoneNo, password } = req.body

    if (
        [fullName, email, userName, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
        //return res.status(400).json( new ApiError(400,null,"All fields are required"))
    }

    const existUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existUser) {
        throw new ApiError(400, "User email or username already exits")
        //return res.status(400).json( new ApiError(400,null,"User email or username already exits"))
    }

    let ph = phoneNo
    if (phoneNo == null || phoneNo == undefined || phoneNo == "") {
        ph = "";
    }

    const user = await User.create({
        fullName,
        email,
        password,
        userName,
        phoneNo: ph
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Some thing went wrong while registration response")
        //return res.status(500).json( new ApiError(500,null ,"Some thing went wrong while registration response"))
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register successfully")
    )

})
/*
const login = asyncHandler(async (req, res) => {
    // get detail from front end username or email address
    // check if user exist in database 
    // if not return with mmessage user does not exist 
    // if exist then campare the password 
    // if password is correct then , gernate bear token 
    // retunr the response 
    console.log(req);
    const { userName, email, password } = req.body;

    const existUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (!existUser) {
        throw new ApiError(400, "No user exist from this email or userName")
    }

    const isPassWordValid = existUser.isPasswordCorrect(password)

    if (!isPassWordValid) {
        throw new ApiError(400, "Creditails are not valid")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(existUser._id)

    const loggedInUser = await User.findById(existUser._id).select(
        "-password -refreshToken"
    );

    // TODO: Add more options to make cookie more secure and reliable
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };


    return res.status(201)
        .cookie("accessToken", accessToken, options) // set the access token in the cookie
        .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
        .json(
            new ApiResponse(200, loggedInUser, "Success")
        )
})
*/
export { registerUser }