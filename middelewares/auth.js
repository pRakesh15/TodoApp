
import * as user from '../models/user.js'
import Jwt  from "jsonwebtoken";
let User=user.User;


export const isautancate=async(req,res,next)=>
{
    const auth=req.cookies.authantication;
   
    if (auth==null) {
       
        //reander home page
        // res.send("app is in undesr construction");
        return res.status(404).json(
            {
                success:false,
                message:"login first",
            }
        )
    }
    else
    {
       
      const decoded=Jwt.verify(auth,process.env.Secreate_key);
      
      req.myUser=await User.findOne({email:decoded.email});
        next();
        
    }
}