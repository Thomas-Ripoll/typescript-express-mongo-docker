import { Router } from "express";

export default interface ControllerInterface{
    initializeRoutes():Router;
}