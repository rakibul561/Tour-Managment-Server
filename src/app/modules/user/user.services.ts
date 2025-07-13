import { IUser } from "./user.interface";
import { User } from "./user.mdal";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  const user = User.create({
    name,
    email,
  }); 
  return user
}; 

  
 const getAllUsers = async() =>{
   const users = await User.find({});

   return users;
 } 
  

 export const UserServiecs = {
    createUser,
    getAllUsers,
}
