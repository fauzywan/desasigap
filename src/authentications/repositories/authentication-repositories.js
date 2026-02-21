import Authentication from '../../models/authentication.model.js';
import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
class AuthenticationRepositories {
  async checkUserLogin(username, password) {
    try {
      const userLower = username.toLowerCase();
      const user = await User.findOne({ phoneNumber: userLower });
      if (!user || !user.password) return null;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return null;
      return user;
    } catch (error) {
      console.error('ERROR :', error);
      throw error;
    }
  }
  async addRefreshToken(token) {
    const newToken = new Authentication({ token });
    await newToken.save();
  }

  async deleteRefreshToken(token) {
    // Gunakan 'Authentication' sesuai nama yang di-import
    await Authentication.deleteOne({ token });
  }

  async verifyRefreshToken(token) {
    // Gunakan 'Authentication' sesuai nama yang di-import
    const result = await Authentication.findOne({ token });

    if (!result) {
      return false;
    }

    return result;
  }
}

export default new AuthenticationRepositories();
