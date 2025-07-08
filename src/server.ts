/* eslint-disable no-console */
import {Server} from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './config/env';

 
let server: Server; 


const startServer = async () =>{
    try { 


        
        await mongoose.connect(envVars.DB_URL)
        console.log("Connected to DB!!");
        server = app.listen(envVars.PORT, () =>{
            console.log(`Server Liseting on Port ${envVars.PORT}`);
            
        })
        

    } catch (error) {
         console.log(error);
         
    }
}


startServer();


   process.on("SIGTERM", () =>{
    console.log("SIGTERM signal recieved........ Server sutting Down");

    if(server){
        server.close(() =>{
        process.exit(1)

        });
    }
    process.exit();
    
})

   process.on("SIGINT", () =>{
    console.log("SIGTERM signal recieved........ Server sutting Down");

    if(server){
        server.close(() =>{
        process.exit(1)

        });
    }
    process.exit();
    
})

   


 
process.on("unhandledRejection", (err) =>{
    console.log("unhandale Rejection detected........ Server sutting Down", err);

    if(server){
        server.close(() =>{
        process.exit(1)

        });
    }
    process.exit();
    
})
process.on("uncaughtException", (err) =>{
    console.log("uncaught Exception detected........ Server sutting Down", err);

    if(server){
        server.close(() =>{
        process.exit(1)

        });
    }
    process.exit();
    
})
 
// unhandler rejection Error
// Promise.reject(new Error (" I forgot to catch this promise "))


// uncaught Exception Error 
// throw new Error("I forgot to handle this localhost!")


