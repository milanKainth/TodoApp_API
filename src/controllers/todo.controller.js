import { asyncHandler } from "../utils/aysncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import moment from "moment/moment.js";

const createTodo = asyncHandler(async (req, res) => {

    // get all the required field from frontend 
    // validate each parameter
    // check if user is exist
    // check the category is exist

    const { title, datetime, ower, status, category } = req.body;

    /*if (
        [title, datetime, ower, status, category].some((field) => 
            field?.trim() === "")
        )
         {
        throw new ApiError(400, "All fields are required")
    }
*/

    if (
        [title ].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
        //return res.status(400).json( new ApiError(400,null,"All fields are required"))
    }

    const existUser = await User.findById(ower)

    if(!existUser){
        throw new ApiError(400 ,"User is not valid")
    }

    const existCategory = await Category.findById(category)

    if(!existCategory){
        throw new ApiError(400,"Category is not valid")
    }

    const newTodo = await Todo.create({
        title,
        datetime : moment.utc(datetime),
        ower : existUser._id,
        status,
        category: existCategory._id
    })

    if(!newTodo) {
        throw new ApiError(500, "Something went wrong while create a new todo")
    }

    return res.status(200).json(
        new ApiResponse(201,newTodo,"Todo is created successfully")
    )
})

const toggleTodoUpdate = asyncHandler(async (req,res) => {

})

const deleteTodo = asyncHandler(async (req,res) => {

})

const updateTodoUpdate = asyncHandler(async (req,res) => {

})




export { createTodo }