import { Router } from "express";

const router = Router()

import * as NGOController from '../controllers/NGOController.js'


router.route('/getNGOs').get(NGOController.getNGOs)





export {router}