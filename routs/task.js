import express, { request } from "express"
import * as taskCotroler from "../controler/task.js"
import * as auth from "../middelewares/auth.js"

export const router=express.Router();

router
.post("/new",auth.isautancate,taskCotroler.newTask)
.get("/myTask",auth.isautancate,taskCotroler.getMyTask)
router.route("/:id").put(auth.isautancate,taskCotroler.updateTask)
.delete(auth.isautancate,taskCotroler.deletTask)





