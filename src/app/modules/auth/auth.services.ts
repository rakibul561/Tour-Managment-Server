import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.mdal";
import  httpStatus  from 'http-status-codes';
import  bcryptjs  from 'bcryptjs';

 


  const credentialsLogin = async (payload:Partial<IUser>) =>{
        
    const {email, password} = payload;
    
    const isUserExist = await User.findOne({email});

    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST, "user does not exist ")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)
    
    if(!isPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")

    } 
    return {
        email: isUserExist.email,
    }

  }


 export  const AuthServices = {
    credentialsLogin
  }