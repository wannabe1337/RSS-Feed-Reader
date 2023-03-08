import express from 'express';
import { body } from 'express-validator';
import { controllers } from '../controllers/compiledController.js';
import { middlewares } from '../middlewares/compiledMiddlewares.js';
export const authRouter= express.Router()

authRouter
    .use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        )
        next()
      })

authRouter
  .post('/login',controllers.signin)
  
  .get('/register',middlewares.getGoogleOAuthUrl,(req,res)=>{
    res.render("register.ejs",{googleOAuthUrl:req.googleOAuthUrl})
  })

  .post('/register',body('email').isEmail(),body('password').isLength({min: 8}),middlewares.checkEmailPasswordValidity,middlewares.checkDuplicateEmail,controllers.signup)

  .post('/profile/logout', middlewares.verifyCSRF,controllers.signout)


  .get('/oauth/google',middlewares.getGoogleOAuthToken,middlewares.getGoogleUserInfo,controllers.googleOAuthLogin)