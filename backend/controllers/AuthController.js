import User from "../model/User.js";
import CryptoJS from 'crypto-js'



export async function register (req, res)
{
    const {name, email, password} = req.body
    const NewUser = new User({
        name,
        email,
        password : CryptoJS.AES.encrypt(
            password,process.env.KEY
        ).toString()
    })

    try {
        const user = await NewUser.save()
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function login (req, res)
{
    try {
        const user = await User.findOne({
            email : req.body.email
        })
        if (!user)
        {
            return res.status(401).json('User not found!')
        }
        const decrypt = CryptoJS.AES.decrypt(user.password,process.env.KEY)
        const Password = decrypt.toString(CryptoJS.enc.Utf8)
        if (Password !== req.body.password)
        {
        return res.status(401).json("Password not matched!")
        }
        
        const {_id, password, ...ok} = user._doc
        res.status(200).json(ok)
    } catch (error) {
        res.status(500).json(error)
    }
}