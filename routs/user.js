import express from "express"
import * as userCotroler from "../controler/user.js"
import * as middelware from '../middelewares/auth.js'

export const router=express.Router();
router.post("/createUser",userCotroler.createUser)
.post("/loginUser",userCotroler.loginUser)
.get("/logout",middelware.isautancate,userCotroler.logoutUser)
.get("/myProfile",middelware.isautancate,userCotroler.getMyprofile);
router.route("/:id").delete(middelware.isautancate,userCotroler.deletUser);