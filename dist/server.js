"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://touradmin:touradmin@cluster0.fmdvppd.mongodb.net/tour-db?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to DB!!");
        server = app_1.default.listen(5000, () => {
            console.log("Server Liseting on Port 5000");
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved........ Server sutting Down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("SIGINT", () => {
    console.log("SIGTERM signal recieved........ Server sutting Down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("unhandledRejection", (err) => {
    console.log("unhandale Rejection detected........ Server sutting Down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
process.on("uncaughtException", (err) => {
    console.log("uncaught Exception detected........ Server sutting Down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit();
});
// unhandler rejection Error
// Promise.reject(new Error (" I forgot to catch this promise "))
// uncaught Exception Error 
// throw new Error("I forgot to handle this localhost!")
