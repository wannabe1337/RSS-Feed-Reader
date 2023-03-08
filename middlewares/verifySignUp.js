import { compiledModelsDB } from '../models/compiledModelsDB.js';
import { validationResult } from 'express-validator';

const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users

export const checkEmailPasswordValidity=(req,res,next)=>{
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty() && errors.errors[0].param === 'email') {
            req.flash("failureInfo","Invalid email address.")
            return res.redirect('/register')
            
        }
        if (!errors.isEmpty() && errors.errors[0].param === 'password') {
            req.flash("failureInfo", "Password must be atleast 8 characters long.")
            res.redirect('/register')
            return
        }
        next()
    } catch (error) {
        console.log("ERROR Info : "+error)
        req.flash("failureInfo", "Failed! Try again.")
        return res.redirect("/register")
        
    }
}
export const checkDuplicateEmail = (req,res,next) => {
  
    // Email
    Users.findOne({
        email: req.body.email
    }).exec((error, user) => {
        if (error) {
            console.log("Error Info : "+error)
            req.flash('failureInfo', 'Failed! Try again.')
            res.redirect("/register")
            return
        }
        if (user) {
            req.flash('failureInfo', 'Failed! Email is already in use!')
            res.redirect("/register")
            return
        }
        else{
            next()
        }
    })
}