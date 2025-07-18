
import express, {  Request, Response } from 'express';
import cors from "cors"
import { router } from './routers';
import { globalErrorHandler } from './middleware/globalErrorHandaler';
import notFound from './middleware/notFound';
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors())


app.use("/api/v1/", router)

app.get("/", (req:Request, res:Response) =>{
    res.status(202).json({
        message: "WellCome to Tour Managment System Backend"
    })
}) 


app.use(globalErrorHandler)

app.use(notFound)



export default app;