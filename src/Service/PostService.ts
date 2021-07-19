import PostModel, { IPost } from "../Model/Post.model";

class PostServiceClass{

    public async createPost(postData: IPost): Promise<IPost>{
        
        const createdPost = new PostModel({
            ...postData,
            createdAT: Date.now()
        });
        try{
            return await createdPost.save();
        }catch(e){
            throw new Error(e);
        }
        
    
    }

    public async getPost(id: string): Promise<IPost|null>{
        
        return await PostModel.findOne({ _id : id});
       
    }

    public async getAllPost(page: number, limit: number): Promise<IPost[]>{

        let postList: IPost[];
        try{
            postList = await PostModel.find()
            .sort({'publishDate' : 'desc'})
            .skip(page * limit)
            .limit(limit);
            return postList;    
        }catch(e){
            throw new Error(e);
        }
         
          
    }
    
}

const postService = new PostServiceClass();

export default postService;