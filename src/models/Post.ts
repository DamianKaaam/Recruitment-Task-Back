import DB from '../database';

export interface IPost {
  title: string;
  body: string;
  userId: number;
}

export class Post {  
  constructor(private post: IPost) {}

  save() {
    const { title, body, userId } = this.post;
    return DB.execute(
      'INSERT INTO posts (title, body, userId) VALUES (?, ?, ?)',
      [title.trim(), body.trim(), userId]
    ).catch(err => Promise.reject(err.message)); 
  }

  update(id: number) {
    const { title, body, userId } = this.post;
    return DB.execute(
      'UPDATE posts SET title=?, body=?, userId=? WHERE id = ?',
      [title.trim(), body.trim(), userId, id]
    ).catch(err => Promise.reject(err.message));
  }

  static get(id: number) {
    return DB.execute(
      'SELECT * FROM posts WHERE id=?',
      [id]
    ).catch(err => Promise.reject(err.message)); 
  }

  static getAll(userId: number) {
    return DB.execute(
      'SELECT * FROM posts WHERE userId=?',
      [userId]
    ).catch(err => Promise.reject(err.message)); 
  }

  static delete(id: number) {
    return DB.execute(
      'DELETE FROM posts WHERE id=?',
      [id]
    ).catch(err => Promise.reject(err.message));
  }
}