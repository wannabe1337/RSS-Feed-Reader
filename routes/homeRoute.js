import express from 'express';
import { middlewares } from '../middlewares/compiledMiddlewares.js';

export const homeRouter= express.Router()
homeRouter
    .get('/',middlewares.getGoogleOAuthUrl,(req,res)=>{
        res.render("home.ejs",{googleOAuthUrl:req.googleOAuthUrl})
    })
    .get('/error',(req,res)=>{
        res.render("error.ejs")
    })
    