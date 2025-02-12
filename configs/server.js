'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { connectionDB } from "./mongo.js";

const middlewares = (app) => {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));

};

const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        middlewares(app);
        connectionMongo();
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};