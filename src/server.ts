import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';

 
let server: Server; 


const startServer = async () =>{
    try {
        await mongoose.connect('mongodb+srv://touradmin:touradmin@cluster0.fmdvppd.mongodb.net/tour-db?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Connected to DB!!");
        server = app.listen(5000, () =>{
            console.log("Server Liseting on Port 5000");
            
        })
        
        
    } catch (error) {
         console.log(error);
         
    }
}


startServer();


