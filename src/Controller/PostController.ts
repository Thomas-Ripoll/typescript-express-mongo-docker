import { NextFunction, Request, Response, Router } from "express";  
import HttpException from "../Exception/Exception";
import { IPost } from "../Model/Post.model";
import postService from "../Service/PostService";
import ControllerInterface from "./ControllerInterface.";

export default class PostController implements ControllerInterface{
    private router: Router = Router()
    private basePath: string;
    constructor(basePatch?: string){
        this.basePath = basePatch ?? "";
    }

    initializeRoutes(): Router {
        this.router.get('/post', this.getPosts)
        this.router.get('/post/:id', this.getPost)
        this.router.post('/post', this.createPost)
        const returnedRouter = Router();
        return returnedRouter.use(this.basePath,this.router);
    }
    
    public async getPosts(request: Request, response: Response, next:NextFunction){
        try{
            let page = Number(request.params.page ?? "1");
            if(page > 0){
                page--;
            }
            else{
                page = 0;
            }

            const limit = Number(request.params.limit ?? "10");
            
            const postList = await postService.getAllPost(page, limit);
            response.send(postList)
        }
        catch(e: any){
            const error = e instanceof HttpException ? e : new HttpException(500,e);
            next(error);
        }
        
    }

    public getPost(request: Request, response: Response, next: NextFunction ){
        try{
            postService.getPost(request.params.id).then((post: IPost|null)=>{
                if(post === null){
                    next(new HttpException(404, 'Post not found'));
                }else{
                    response.status(200).send(post);
                }
            })
        }catch(e){
            const error = e instanceof HttpException ? e : new HttpException(500,e);
            next(error);
        }
        
    }

    public async createPost(request: Request, response: Response, next: NextFunction){
         try {
            const postData: IPost  = request.body;

            const returnedPost = await postService.createPost(postData);
            response.status(201).send(returnedPost)
         } catch (e) {
            const error = e instanceof HttpException ? e : new HttpException(500,e);
            next(error);
         } 
        
    }
}