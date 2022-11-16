const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToRes = ({ res, user }) => {
  const payload = createJWT(user);

  const oneDay = 1000 * 60 * 60 * 24;
 
  res.cookie("token", payload, {
    httpOnly: true,
    expiresIn: new Date(Date.now() + oneDay),
    signed: true,
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = {
  attachCookiesToRes,
  createJWT,
  verifyJWT,
};
