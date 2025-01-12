const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// const authorize = (roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role_id)) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }
//   next();
// };

const authorize = (permissions) => (req, res, next) => {
  const userPermissions = req.user.permissions || [];
  const hasPermission = permissions.some((perm) => userPermissions.includes(perm));

  if (!hasPermission) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};


module.exports = { authenticate, authorize };
