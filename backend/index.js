import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import { router as AuthRoute } from './routes/AuthRoute.js'
import { router as ProfileRoute } from './routes/ProfileRoute.js'
import { router as NGORoute } from './routes/NGORoutes.js'
import session from "express-session"
import passport from 'passport'
import NGO from './model/NGO.js'
import ngoData from './data/NGOdata.js'
import  cookieParser from 'cookie-parser';
const app = express()

// somewhere in your initialization file
app.use(cookieParser());

dotenv.config()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true
    }
))
app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

app.use(passport.initialize())
app.use(passport.session())



app.use('/auth', AuthRoute)
app.use('/profile', ProfileRoute)
app.use('/ngos', NGORoute)



const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    console.log("Database Connected")

    app.listen(PORT, () => {

        console.log(`Server Connection Established at ${PORT}`)

    })
    // NGO.insertMany(ngoData, {ordered: false})
})

    .catch((error) => {

        console.log(error)
    })


