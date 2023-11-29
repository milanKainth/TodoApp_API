import { asyncHandler } from "../utils/aysncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createCategory = asyncHandler(async (req, res) => {

    // get user details from front end and category details also.
    // check if fields ar not empty
    // validate if user exist in system or not
    // create new category in db
    // return the res 


    const { title, ower, } = req.body;

    if (
        [title, ower].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const userExist = User.findById(ower);

    if(!userExist){
        throw new ApiError(400,"User does n't exist")
    }


    const newCategory = await Category.create({
        title,
        ower : userExist._id
    })

    const existCategory = await Category.findById(newCategory._id)

    if (!existCategory) {
        throw new ApiError(500, "Something went wrong while creating new category.")
    }

    return res.status(201).json(
        new ApiResponse(200, existCategory, "Category is created successfully")
    )
})


export { createCategory }