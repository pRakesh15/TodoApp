import Jwt  from "jsonwebtoken";
import * as data from "../models/user.js"

const user=data.User
let token=user.token
export const sendCookie=(res,user)=>
{
    

    res.cookie("authantication",token,
    {
        httpOnly:true,
        expires:new Date(Date.now()+72*60*60*1000)
    })
    // .json({
    //     success:true,
    //     message:"cookies set successfylly",
    // });
};