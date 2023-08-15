import mongoose from "mongoose";

export const dbConnection=async()=>
{
   await mongoose.connect(process.env.MONGO_URL,{dbName:"ToDoapp"})
}
dbConnection().then((c)=>
{
    console.log(`database connected sucessfully`);
}).catch(err=>console.log(err));