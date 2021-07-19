import HttpException from "Exception/Exception";
import { NextFunction, Request, Response } from "express";


export default class MiddlewareCollection {
    
    public static handleErrors(error: HttpException, _request: Request, response: Response, _next: NextFunction ):void{
        console.log("bizarre");
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        response.status(status).send({
            status,
            message,
            })
    }
}