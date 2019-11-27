import { Comment, IComment } from '../models/Comment';
import { getParamValue } from '../helpers/paramsHelper';
import { getSlugValue } from '../helpers/slugHelper';
import { update } from '../helpers/updateHelper';

export class CommentController {
  static getAllPostComments(url: string) {
    const postId = getParamValue(url, 'postId');
    return Comment.getAll(Number(postId));
  }

  static getComment(url: string): Promise<any> {
    const postId = getSlugValue(url);
    return Comment.get(Number(postId));
  }

  static createComment(parsedBody: string) {
    const requestData: IComment = JSON.parse(parsedBody);

    const emailRegExp: RegExp = /\S+@\S+\.\S+/;
    if (!emailRegExp.test(requestData.email)) {
      return Promise.reject('Invalid email format');
    }

    const comment = new Comment(requestData);
    return comment.save();
  }

  static async updateComment(parsedBody: string, url: string): Promise<any> {
    const commentId = getSlugValue(url);
    const [rows, fields] = await this.getComment(url);
    
    if (!rows.length) {
      return Promise.reject('Comment does not exist');
    }

    const updatedCommet = await update(parsedBody, rows);
    const comment = new Comment(updatedCommet);
    return comment.update(Number(commentId));
  }

  static deleteComment(url: string) {
    const commentId = getSlugValue(url);
    return Comment.delete(Number(commentId));
  }
}
 