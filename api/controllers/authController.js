import JsonWebToken from 'jsonwebtoken'
import passport from 'passport'
import helpers from '../helpers'
import queries from '../helpers/queries';

const { config, db } = helpers

const get = (req, res) => {
  res.send({
    data: req.user
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

const getUser = (req, res) => {
  const { user_id } = req.user;

  db.connect().then((obj) => {
    obj.one(queries.user['selectById'], user_id)
      .then((data) => {
        res.send({status: 200, data})
      })
      .catch((e) => {
        res.send({status: 402, error: e.message || e})
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

export default { get, post, getUser }