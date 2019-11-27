import { Post, IPost } from '../models/Post';
import { getParamValue } from '../helpers/paramsHelper';
import { getSlugValue } from '../helpers/slugHelper';
import { update } from '../helpers/updateHelper';

export class PostController {
  static getAllUserPosts(url: string) {
    const userId = getParamValue(url, 'userId');
    return Post.getAll(Number(userId));
  }

  static getPost(url: string): Promise<any> {
    const postId = getSlugValue(url);
    return Post.get(Number(postId));
  }

  static createPost(parsedBody: string): Promise<any> {
    const requestData: IPost = JSON.parse(parsedBody);
    const post = new Post(requestData);
    return post.save();
  }

  static async updatePost(parsedBody: string, url: string): Promise<any> {
    const postId = getSlugValue(url);
    const [rows, fields] = await this.getPost(url);
    
    if (!rows.length) {
      return Promise.reject('Post does not exist');
    }

    const updatedPost = await update(parsedBody, rows);
    const post = new Post(updatedPost);
    return post.update(Number(postId));
  }

  static deletePost(url: string): Promise<any> {
    const postId = getSlugValue(url);
    return Post.delete(Number(postId));
  }
}