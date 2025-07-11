
import express, { Request, Response } from 'express';
import cors from "cors"
import { router } from './routers';

const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1/", router)

app.get("/", (req:Request, res:Response) =>{
    res.status(202).json({
        message: "WellCome to Tour Managment System Backend"
    })
})


export default app;