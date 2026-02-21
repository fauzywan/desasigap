import TokenManager from '../authentications/security/token-manager.js';
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await TokenManager.verifyAccessToken(
        token.split('Bearer ')[1],
      );
      if (user === null) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
  return res.status(401).json({ message: 'Unauthorized' });
}
export default authenticateToken;

export const admin = (req, res, next) => {
  const { user } = req.body;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Akses ditolak: Hanya admin yang diizinkan',
    });
  }
};
