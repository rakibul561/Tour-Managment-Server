/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserServiecs } from "./user.services";
// import AppError from "../errorHelpers/AppError";

       

       const creteUser =  async (req:Request, res:Response, next:NextFunction) =>{
         try {
            
            // throw new AppError(httpStatus.BAD_REQUEST, "fake data ")
           const user = UserServiecs.createUser(req.body);
            
            res.status(httpStatus.CREATED).json({
                message: "User Created Succesfully",
                user,
            })
            
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         } catch (err:any) {
          console.log(err);
          
             next(err)
            }
            
         }


         const getAllUsers = async(req:Request, res:Response, next:NextFunction) =>{
           
            try {
               const users = await UserServiecs.getAllUsers();
            } catch (err:any) {
               console.log(err);
               next(err)
               
            }
         }
       



      export const userController = {
        creteUser,
        
       }