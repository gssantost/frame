import passportLocal from 'passport-local'
import User from './user'

const localStrategy = passportLocal.Strategy

export default new localStrategy((username, password, done) => {
  User.findByUsername(username).then((data) => {
    if (data.error) {
      console.log(data)
      return done(null, false)
    }
    User.comparePassword(password, data.password).then((isMatch) => {
      if (isMatch) {
        Reflect.deleteProperty(data, 'password')
        return done(null, data)
      } else {
        return done(null, false, {message: 'Incorrect username or password.'})
      }
    }).catch((error) => {
      return error
    })
  }).catch((error) => {
    return done(error)
  })
})