import jwt from 'jsonwebtoken';

//unusued//
const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: 'Auth failed'
    })
  }
}

export default checkAuth