
import express, { Request, Response } from 'express';





const app = express();




app.get("/", (req:Request, res:Response) =>{
    res.status(202).json({
        message: "WellCome to Tour Managment System Backend"
    })
})


export default app;