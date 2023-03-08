import express from 'express';
import { controllers } from '../controllers/compiledController.js';
import { middlewares } from '../middlewares/compiledMiddlewares.js';

export const profileRouter= express.Router()

profileRouter
    .get('/profile',middlewares.verifyToken,middlewares.genCSRFToken,controllers.fetchSubs,(req,res)=>{

        console.log("Profile : \n",req.session)
        res.render("profile.ejs",{feedTitles:req.feedTitle, _csrf:req.session.csrfToken})
    })