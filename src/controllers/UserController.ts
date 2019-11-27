import { User, IUser } from '../models/User';
import { getSlugValue } from '../helpers/slugHelper';
import { update } from '../helpers/updateHelper';

export class UserController {
  static getAllUsers() {
    return User.getAll();
  }

  static getUser(url: string): Promise<any> {
    const userId = getSlugValue(url);
    return User.get(Number(userId));
  }

  static createUser(parsedBody: string): Promise<any> {
    const requestData: IUser = JSON.parse(parsedBody);

    const emailRegExp: RegExp = /\S+@\S+\.\S+/;
    if (!emailRegExp.test(requestData.email)) {
      return Promise.reject('Invalid email format');
    }

    const user = new User(requestData);
    return user.save();
  }

  static async updateUser(parsedBody: string, url: string): Promise<any> {
    const userId = getSlugValue(url);
    const [rows, fields] = await this.getUser(url);
    
    if (!rows.length) {
      return Promise.reject('User does not exist');
    }

    const updatedUser = await update(parsedBody, rows);
    const user = new User(updatedUser);
    return user.update(Number(userId));
  }

  static deleteUser(url: string): Promise<any> {
    const userId = getSlugValue(url);
    return User.delete(Number(userId));
  }
}
