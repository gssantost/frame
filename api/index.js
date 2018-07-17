import express from 'express'
import passport from 'passport'
import jwt from 'express-jwt'
import cors from 'cors'
import helpers from './helpers'
import Routes from './routes'

const { config, Strategies } = helpers
const app = express();

app.use('/static', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(jwt({
  secret: config.secret,
  credentialsRequired: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use('/api', Routes)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      status: 401,
      message: err.name + ": " + err.message
    }
  );
  }
});

passport.use(Strategies)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.listen(config.port, () => {
  console.log(`SERVER LISTENING ON PORT ${config.port}`)
})