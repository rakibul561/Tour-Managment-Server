import { Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { User } from "./user.mdal";

       

       const creteUser =  async (req:Request, res:Response) =>{
         try {
            const {name, email} = req.body;

            const user = User.create({
                name, email
            })
            res.status(httpStatus.CREATED).json({
                message: "User Created Succesfully",
                user,
            })
            
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         } catch (err:any) {
            console.log(err);
            res.status(httpStatus.BAD_REQUEST).json({
                message: `something went wrong ${err.message}`
            })
            
         }
       }



      export const userController = {
        creteUser,
        
       }