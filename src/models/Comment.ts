import DB from '../database';

export interface IComment {
  name: string;
  email: string;
  body: string;
  postId: number;
}

export class Comment {  
  constructor(private comment: IComment) {}

  save() {
    const { name, email, body, postId } = this.comment;
    return DB.execute(
      'INSERT INTO comments (name, email, body, postId) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), body.trim(), postId]
    ); 
  }

  update(id: number) {
    const { name, email, body, postId } = this.comment;
    return DB.execute(
      'UPDATE comments SET name=?, email=?, body=?, postId=? WHERE id = ?',
      [name.trim(), email.trim(), body.trim(), postId, id]
    ).catch(err => Promise.reject(err.message));
  }

  static getAll(postId: number) {
    return DB.execute(
      'SELECT * FROM comments WHERE postId=?',
      [postId]
    );
  }

  static get(id: number) {
    return DB.execute(
      'SELECT * FROM comments WHERE id=?',
      [id]
    ).catch(err => Promise.reject(err.message));
  }

  static delete(id: number) {
    return DB.execute(
      'DELETE FROM comments WHERE id=?',
      [id]
    )
  }
}