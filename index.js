import express, { urlencoded } from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';
import * as userRouter from './routs/user.js'
import * as taskRouter from './routs/task.js'
export   const app=express();
import {config} from 'dotenv';
import * as middelware from './middelewares/auth.js'
import {errormiddelware} from './middelewares/error.js'
import cors from 'cors';
config()

app.set("view engine","ejs")
app.use(cors())
app.use(express.static(path.join(path.resolve(),"public")));

app.use(express.urlencoded({extended:true}));


app.use(cookieParser());
app.use(express.json());
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true
// }))


app.use("/api/v1/user",userRouter.router);
app.use("/api/v1/task",taskRouter.router);



app.get("/",middelware.isautancate,(req,res)=>
{
//users home page
res.send(`welcom back Mrs/Mr ${req.myUser.name} `)

})



app.use(errormiddelware)