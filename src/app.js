import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extend: true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes imports

import userRouter from "./routes/user.router.js";
import todoRouter from "./routes/todo.router.js";
import categoryRouter from "./routes/category.router.js";


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/todos", todoRouter)
app.use("/api/v1/category", categoryRouter)
//

export {app}