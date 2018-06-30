import JsonWebToken from 'jsonwebtoken'
import passport from 'passport'
import helpers from '../helpers'

const { config } = helpers

const get = (req, res) => {
  res.send({
    session: req.user
  })
}

const post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err) {
      return res.send({
        status: 404,
        error: err
      })
    }
    
    if (!user) {
      return res.send({
        status: 401,
        error: info
      })
    }
  
    const jwt = JsonWebToken.sign(user, config.secret);    
    return res.status(200).send({
      status: 200,
      message: 'Login Successful',
      token: jwt
    })
  })(req, res, next)
}

export default { get, post }