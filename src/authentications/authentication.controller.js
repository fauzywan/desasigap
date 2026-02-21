import User from '../models/user.model.js';
import authenticationRepositories from './repositories/authentication-repositories.js';
import TokenManager from './security/token-manager.js';
export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  const result =
    await authenticationRepositories.verifyRefreshToken(refreshToken);
  await authenticationRepositories.deleteRefreshToken(refreshToken);

  return res.status(200).json({ message: 'Refresh token berhasil dihapus' });
};
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await authenticationRepositories.checkUserLogin(
    username,
    password,
  );
  if (!user) {
    return res.status(401).json({
      message: 'Username / Password salah',
    });
  }

  const accessToken = TokenManager.generateAccessToken({ id: user._id });
  const refreshToken = TokenManager.generateRefreshToken({ id: user._id });
  await authenticationRepositories.addRefreshToken(refreshToken);
  const data = {
    id: user._id,
    name: user.name,
    role: user.userType,
    phone: user.phoneNumber,
    accessToken,
    refreshToken,
  };

  return res
    .status(201)
    .json({ data, message: 'Authentication berhasil ditambahkan' });
};

// export const login = async (req, res, next) => {
//   const { username, password } = req.validated;
//   const userId = await UserRepositories.verifyUserCredential(
//     username,
//     password,
//   );

//   if (!userId) {
//     return next(new AuthenticationError('Kredensial yang Anda berikan salah'));
//   }

//   const accessToken = TokenManager.generateAccessToken({ id: userId });
//   const refreshToken = TokenManager.generateRefreshToken({ id: userId });

//   await authenticationRepositories.addRefreshToken(refreshToken);

//   return response(res, 201, 'Authentication berhasil ditambahkan', {
//     accessToken,
//     refreshToken,
//   });
// };
// export const refreshToken = async (req, res, next) => {
//   const { refreshToken } = req.validated;

//   const result =
//     await authenticationRepositories.verifyRefreshToken(refreshToken);

//   if (!result) {
//     return next(new InvariantError('Refresh token tidak valid'));
//   }

//   const { id } = TokenManager.verifyRefreshToken(refreshToken);
//   const accessToken = TokenManager.generateAccessToken({ id });

//   return response(res, 200, 'Access Token berhasil diperbarui', {
//     accessToken,
//   });
// };
// export const logout = async (req, res, next) => {
//   const { refreshToken } = req.validated;

//   const result =
//     await authenticationRepositories.verifyRefreshToken(refreshToken);

//   if (!result) {
//     return next(new InvariantError('Refresh token tidak valid'));
//   }

//   await AuthenticationRepositories.deleteRefreshToken(refreshToken);

//   return response(res, 200, 'Refresh token berhasil dihapus');
// };
// import authenticationRepositories from '../repositories/authentication-repositories.js';
// import TokenManager from '../security/token-manager.js';
// import ClientError from './client-error.js';

// class AuthenticationError extends ClientError {
//   constructor(message) {
//     super(message, 401);
//     this.name = 'AuthenticationError';
//   }
// }

// export default AuthenticationError;
