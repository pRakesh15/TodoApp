import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema=mongoose.Schema({
    titel:{
        type:String,
        required:true,
    },
    descripption:
    {
        type:String,
        required:true,
    },
    isCompleted:
    {
        type:Boolean,
        default: false,  
    },
    User:[{type:Schema.Types.ObjectId, ref:'User',require:true}],
})


export const Task=mongoose.model("TodoTask",schema);