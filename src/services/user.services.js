import User from "../models/user.model.js";

export default class UserServices {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async register(user) {
    try {
      const { email, password } = user;
      if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
        return await User.create({...user, role: 'admin'});
      }
      const exists = await this.findByEmail(email);
      console.log(exists);
      if (!exists) return await User.create(user);
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email, password) {
    try {
     
      console.log('body', email, password);
      const userExist = await User.findOne({ email, password });
      console.log('login::', userExist);
      if (!userExist) return false;
      else return userExist;
    } catch (error) {
      console.log(error);
    }
  }
}