import DB from '../database'

interface ICompany {
  companyName?: string; 
  catchPhrase?: string;
  bs?: string
}

export interface IUser extends ICompany {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  compoany?: ICompany;
}

export class User {  
  constructor(private user: IUser) {}

  save() {
    const { name, username, email, phone, website } = this.user;
    return DB.execute(
      'INSERT INTO users (name, username, email, phone, website) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), username.trim(), email.trim(), phone.trim(), website.trim()]
    ).catch(err => Promise.reject(err.message));
  }

  update(id: number) {
    const { name, username, email, phone, website } = this.user;
    return DB.execute(
      'UPDATE users SET name=?, username=?, email=?, phone=?, website=? WHERE id = ?',
      [name.trim(), username.trim(), email.trim(), phone.trim(), website.trim(), id]
    ).catch(err => Promise.reject(err.message));
  }


  static get(id: number) {
    return DB.execute(
      'SELECT * FROM users WHERE id=?',
      [id]
    ).catch(err => Promise.reject(err.message)); 
  }

  static getAll() {
    return DB.execute(
      `SELECT u.*, c.name AS 'companyName', c.catchPhrase, c.bs 
      FROM users AS u
      JOIN companies AS c ON u.id = c.userId`
    ).catch(err => Promise.reject(err.message));
  }

  static delete(id: number) {
    return DB.execute(
      'DELETE FROM users WHERE id=?',
      [id]
    ).catch(err => Promise.reject(err.message));
  }
}