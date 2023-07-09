import mongoose from "mongoose"
import NGO from "../model/NGO.js"


export async function getNGOs(req, res) {
    try {
        const ngos = await NGO.find()

        res.status(200).json(ngos)
    }
    catch (err) {
        res.status(500).json(err)
    }
}