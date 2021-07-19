import ControllerInterface from "Controller/ControllerInterface.";
import { cleanEnv, port, str } from "envalid";
import express,{ Application, json, urlencoded } from "express";
import mongoose , { Mongoose } from "mongoose";
import 'dotenv/config';
import MiddlewareCollection from "./MiddlewareCollection";


export default class App{
    private app: Application;
    private mongoose?: Mongoose;

    constructor(controllers: ControllerInterface[]){
        this.app = express();
        this.init()
        this.initializePreControllerMiddlewares();
        this.initializeControllers(controllers);
        this.initializePostControllerMiddlewares();
        
    }  

    public init(){
        cleanEnv(process.env, {
            MONGO_PASSWORD: str(),
            MONGO_PATH: str(),
            MONGO_USER: str(),
            PORT: port(),
        });
        this.connectToTheDatabase()
    }

    private initializePreControllerMiddlewares(){
        this.app.use(json())
        this.app.use(urlencoded({
            extended : true
        }))
    }

    private initializePostControllerMiddlewares(){
        this.app.use(MiddlewareCollection.handleErrors);
    }

    private initializeControllers(controllerList: ControllerInterface[]){
        for(let controller of controllerList){
            this.app.use('/', controller.initializeRoutes());
        }
    }  

    private connectToTheDatabase() {
        
        const {
          MONGO_USER,
          MONGO_PASSWORD,
          MONGO_PATH,
          MONGO_DB
        } = process.env;

        if(this.mongoose == undefined){
            this.mongoose = mongoose
        }
        console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}/${MONGO_DB}`)
        try{
            this.mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}/${MONGO_DB}`,{ useNewUrlParser: true, useUnifiedTopology: true  });
        }catch(e){
            throw new Error(e)
        }
        
    }

    public run(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
          })
    }
        
}