import { Router } from "express";
import { createTodo } from "../controllers/todo.controller.js";


const router = Router();

router.route("/createtodo").post(createTodo);


export default router;