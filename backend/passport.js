import dotenv from 'dotenv'

dotenv.config()

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import passport from 'passport'

import User from './model/User.js'


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`
    },
    async function (accessToken, refreshToken, profile, done) {
      const { email, name, picture } = profile?._json

      try {
        const user = await User.findOne({ email })

        if (user) {
          console.log("User already exists")
          done(null, user)
        }
        else {
          const newUser = await User.create({
            email: email,
            name: name,
            profilePic: picture,
            donations: []
          })
          done(null, newUser)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  ),
);

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
  },
    async function (accessToken, refreshToken, profile, done) {
      const { id, name, picture } = profile?._json

      try {
        const user = await User.findOne({ name })

        if (user) {
          console.log("User already exists")
          done(null, user)
        }
        else {
          const newUser = await User.create({
            name: name,
            profilePic: picture,
            donations: []
          })
          done(null, newUser)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  )

);



export default passport