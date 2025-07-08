import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';





const app = express();




app.get("/", (req:Request, res:Response) =>{
    res.status(202).json({
        message: "WellCome to Tour Managment System Backend"
    })
})


export default app;