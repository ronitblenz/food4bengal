import { Router } from "express";
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

import * as AuthController from '../controllers/AuthController.js'
import passport from "../passport.js"

router.route('/register').post(AuthController.register)

router.route('/login').post(AuthController.login)

router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router.route('/google/callback').get(passport.authenticate('google',
    {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
    }
))

router.route('/facebook').get(passport.authenticate('facebook', { scope: ['profile', 'email'] }))

router.route('/facebook/callback').get(passport.authenticate('facebook',
    {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
    }
))

router.route('/success').get((req, res) => {
    if (req.user) {
        const { _id, createdAt, updatedAt, __v, ...info } = req.user._doc
        console.log(info)
        res.cookie('food4bengal', info,
            {
                maxAge: 60 * 60 * 1000,
                secure: true,
                // httpOnly: true, /** we can't read httponly cookie from browser */
                sameSite: 'lax'
            }
        )
        res.status(200).redirect(process.env.CLIENT_URL)
    }
    else {
        res.status(403).json({ error: true, msg: 'Not Authorized' })
    }
})

router.route('/failure').get((req, res) => {
    res.status(401).json({
        error: true,
        msg: 'Login Failed'
    })
})

router.route('/logout').get((req, res) => {
    req.logout(() => res.redirect(process.env.CLIENT_URL))
})


export { router }