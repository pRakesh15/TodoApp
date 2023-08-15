import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from '../middelewares/error.js';

import * as data from "../models/user.js"

const user=data.User

// function for craet user

export const createUser=async(req,res,next)=>
{
try {
  
const iuser=new user(req.body);
const olduser=await user.findOne({email:req.body.email});

if(olduser)

return next(new ErrorHandler("user alrady exist",404));


let token=Jwt.sign({email:req.body.email},process.env.Secreate_key)
const hash=bcrypt.hashSync(req.body.password,10)
iuser.token=token
iuser.password=hash
let p1=iuser.save()
p1.then((value)=>
{
    let auth=res.cookie("authantication",iuser.token,{
        httpOnly:true,
        expires:new Date(Date.now()+72*60*60*1000),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
      });
      if(auth)
      {
        //render user page 
        
        res.status(200).json({
          success:true,
          message:"Created Sucessfully"
        })
      }
      else
      {
        //render logoin pg
        res.status(404).json({
          success:false,
          message:"Can not crreate uaer"
        })
      }
}).catch((Error)=>
{
    res.status(401).json({
      success:false,
      message:"Somthing is wrong"
    })
})
} catch (error) {
  next(error)
}
}

//function for login user

export const loginUser=async(req,res,next)=>
{
  try {
    
    const doc=await user.findOne({email:req.body.email});
 

    if(doc)
    {
      const isAuth = bcrypt.compareSync(req.body.password, doc.password);
   
      if (isAuth) {
      
        let token = Jwt.sign({ email: req.body.email }, process.env.Secreate_key);
        doc.token=token;
     
      let p1=  doc.save();
         let promise=new Promise((resolve,reject)=>
         {
             resolve (p1)
         });
         
         promise.then((value)=>
         {
         let auth=res.cookie("authantication",doc.token,{
               httpOnly:true,
               expires:new Date(Date.now()+72*60*60*1000),
               sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
               secure:process.env.NODE_ENV==="Development"?false:true,
             });
           if (auth) {
               //reeander users hoome page
            
               res.status(200).json({
                success:true,
                message:`welcom back Mrs/Mr ${doc.name}`
              })
           }
           else
           {
               res.status(404).json({
                success:false,
                message:"Authentication faild"
              })
           }
         });
     }
     else
     {
        res.status(404).json({
          success:false,
          message:"Incorect password"
        })
        //  res.render("login",{email:doc.email,message:"incorrect password"});
     }
    
    }
    else
    {
  res.status(404).json({
    success:false,
    message:"Entered user dosnt exist"
  })
    }
  } catch (error) {
    next(error)
  }
}

export const getMyprofile=async(req,res,next)=>
{
 try {
  res.status(200).json(
    {
      success:true,
      User:req.myUser,
    }
   )
 } catch (error) {
  next(res.status(404).json({
    success:false,
    message:"internal server error"
  }))
 }
}

//Working on it*********************************
// export const updateUser=async(req,res,next)=>
// {
//   const id = req.params.id;

// try {
//   const doc = await user.findOneAndReplace({_id:id }, req.body, {
//     new: true,
//   });
// let p=doc
// console.log(req.body)
// p=new Promise((resolve,reject)=>
// {
//   return resolve;
// }).then((p)=>
// {
//   res.status(200).json({
//     success:true,
//     message:"task updated"
//   })
// }).catch(p)
// {
//   res.status(404).json({
//     success:false,
//     message:"cant update password"
//   })
// }

//   console.log(doc)
  
// } catch (error) {
//   next(error)
// }
// }

export const deletUser=async(req,res,next)=>{
let id=req.params.id

  try {
    const DeletUser=await user.findOne({_id:id});
 
    if(!DeletUser)
    {
      return next(new ErrorHandler("entered user dosnot exist",404))
    }
  await  DeletUser.deleteOne();
  res.status(200).json({
    success:true,
    message:"User deleted Sucessfully"
  })
  
  } catch (error) {
    next(error)
  }

}

export const logoutUser=(req,res)=>
{
    res.clearCookie('authantication')
    res.status(200).json({
      success:true,
      message:"logOut Sucessfully"
    })
}