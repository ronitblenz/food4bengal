import { Router } from "express";
//import { Router as Profile} from '../../frontend/src/pages/Profile/Profile';
//import App from "../../frontend/src/pages/Profile/Profile";



const router = Router()

const authCheck = (req, res, next) => {
if(!reg.user){
// if user is not logged in 
    res.redirect('/auth/google');
    res.redirect('/auth/facebook');
} else {
// if logged in
next();
}
};
router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});
export {router}