import passport from 'passport'
import JsonWebToken from 'jsonwebtoken'
import helpers from '../helpers'
import bcrypt from 'bcryptjs'

const { db, queries, config } = helpers

/** GET:  */
const getByUserId = (req, res) => {
  db.connect().then((obj) => {
    obj.one(queries.user['selectById'], req.params.userId)
      .then((data) => {
        const { profile_pic, ...rest } = data
        const user = { 
          ...rest,
          profile_pic: config.static + profile_pic.split('uploads')[1]
        }
        res.send({status: 200, user})
        obj.done()
        next(data)
      })
      .catch((e) => {
        res.send({status: 402, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

/** GET: all User data from DB (no password returned to client app, of course...) */
const getUser = (req, res) => {
  const { user_id } = req.user
  console.log(user_id)
  db.connect().then((obj) => {
    obj.one(queries.user['selectById'], user_id)
      .then((data) => {
        const { profile_pic, ...rest } = data
        const user = { 
          ...rest,
          profile_pic: config.static + profile_pic.split('uploads')[1]
        }
        res.send({status: 200, user})
        obj.done()
      })
      .catch((e) => {
        res.send({status: 402, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}

/** POST: update profile pic only... */
const postPicture = (req, res) => {
  if (req.file === undefined) {
    res.send({status: 400, message: 'No file found!'})
  }
  
  const { fullname, username, email, bio } = req.body;
  console.log(req.file);
  
  db.connect().then(obj => {
    obj.any(queries.user['updateUserPic'], [fullname, username, bio, email, req.file.path, req.user.user_id])
      .then(data => {
        res.send({status: 200, message: 'Your profile has changed!'})
        obj.done()
      })
      .catch(e => {
        console.log(e.message || e)
        res.send({status: 400, error: e.message || e})
        obj.done()
      })
  }).catch(e => {
    console.log(e.message || e)
    res.send({status: 500, error: e.message || e})
  })
}


/** PUT: update any other user field (name, username, bio, email) */
const putUser = (req, res) => {
  const { fullname, username, email, bio } = req.body

  console.log(req.body)
  console.log(req.file)

  db.connect().then((obj) => {
    obj.any(queries.user['updateUser'], [fullname, username, bio, email, req.user.user_id])
      .then((data) => {
        console.log(data)
        res.send({status: 200, message: 'Your profile has changed!'})
        obj.done()
      })
      .catch((e) => {
        console.log(e.message || e)
        res.send({status: 402, error: e.message || e})
        obj.done()
      })
  }).catch((e) => {
    res.send({status: 500, error: e.message || e})
  })
}


/** POST: login */
const login = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {

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

/** POST: signUp */
const signUp = (req, res) => {
  const { fullname, username, email, password } = req.body;

  if ((fullname && username && email && password) != '') {
    
    let passwordAsHash = bcrypt.hashSync(password.trim(), 10);
    
    db.task(async t => {
      const userExists = await t.oneOrNone(queries.user['selectByUsername'], username);
      if (userExists === null) {
        return await t.any(queries.user['create'], [fullname.trim(), username.trim(), email.trim(), passwordAsHash])
      }
      return { message: 'Username already exists' };
    }).then(data => {
      if (data[0].user_id) {
        res.send({status: 200, message: 'Done'});
      } else {
        res.send({status: 200, message: data.message});
      }
    }).catch(e => {
      res.send({status: 500, error: e.message || e});
    })
    
  } else {
    res.send({status: 400, error: 'Can´t process while there are empty fields'});
  } 
}

export default { getByUserId, getUser, postPicture, putUser, login, signUp }