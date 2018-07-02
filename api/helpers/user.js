import db from './db'
import queries from './queries'
import bcrypt from 'bcryptjs'

const findByUsername = (username) => {
  return new Promise((res, rej) => {
    db.connect().then((obj) => {
      obj.one(queries.user['selectByUsername'], username.trim())
        .then((data) => {
          res(data)
          obj.done()
        })
        .catch((e) => {
          console.log(e.message || e)
          rej({message: 'Usuario no existe'})
          obj.done()
        })
    }).catch((e) => {
      console.log(e.message || e)
      rej({status: 500, error: e.message || e})
    })
  })
}

const comparePassword = (candidatePassword, passwordHash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, passwordHash, (error, isMatch) => {
      if (error) {
        rej(error)
      }
      res(isMatch)
    })
  })
}

export default { findByUsername, comparePassword }