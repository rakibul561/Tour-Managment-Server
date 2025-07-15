import { envVars } from "../../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.mdal";
import  bcryptjs  from 'bcryptjs';

 

  export const seedSuperAdmin =  async () =>{
      try {
         const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})

         if(isSuperAdminExist){
            console.log("Super admin Already exist");
         }
         console.log("trying to create super Admin.......");
         
        
          const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_EMAIL, Number(envVars.BCRYPT_SALT_ROUND))
          
         const authProvider:IAuthProvider = {
             provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
         } 
        
         const payload:IUser = {
            name:"super admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            auths:[authProvider],
            isVerified:true
         }
           
         const superAdmin = await User.create({payload})
         console.log("super admin created succesfully!!\n");
         
         console.log(superAdmin);
         
      } catch (error) {
        console.log(error);
        
      }
  }