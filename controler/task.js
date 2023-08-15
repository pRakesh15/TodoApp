import ErrorHandler from '../middelewares/error.js';
import * as  task from '../models/task.js' 


const Task=task.Task;



export const newTask=(req,res,next)=>
{

 try {
    const{titel,descripption}=req.body;
    const istask=new Task({
     titel,
     descripption,
     User:req.myUser,
 });
 
 let addTask=istask.save();
 addTask.then((value)=>
 {
     res.status(201).json({
         success:true,
         message:"task added successfylly"
     })
 }).catch((Error)=>
 {
     res.status(401).json({
        success:false,
        message:Error
    })
 })
 } catch (error) {
    next(error)
 }

}

export const getMyTask=async(req,res,next)=>
{
try {
    
const userId=req.myUser._id;

const tasks=await Task.find({User:userId});
res.status(200).json({
    success:true,
    tasks
    
})

} catch (error) {
    next(error)
}
}

export const updateTask=async(req,res,next)=>
{
   try {
    const tasks=await Task.findById(req.params.id);
    if(!tasks)
    {
        return next(new ErrorHandler("invalide id",404));
    }
    tasks.isCompleted=!tasks.isCompleted;
await tasks.save();

    res.status(200).json({
        success:true,
        message:"task updated"
        
    })
   } catch (error) {
    next(error)
   }
}

export const deletTask=async(req,res,next)=>
{
    try {
        const tasks=await Task.findById(req.params.id);
    if(!tasks)
    {
        return next(new ErrorHandler("invalide id",404));
    }
    
await tasks.deleteOne();

    res.status(200).json({
        success:true,
        message:"task deleted"
        
    })
    } catch (error) {
        next(error)
    }
}