import { model, Schema } from "mongoose";

export interface IPost{
    author: string;
    content: string;
    title: string;
    createdAt: Date;
}

const postSchema = new Schema<IPost>({
    author: String,
    content: String,
    title: String,
    createdAt: { "type": Date , "default": Date.now }
})

const PostModel = model<IPost>('Post', postSchema);
 
export default PostModel;