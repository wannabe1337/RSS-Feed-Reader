import { compiledModelsDB } from "../models/compiledModelsDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users

//SignUp
const signup = (req, res) => {
    const user = new Users({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
  
    user.save((error, user) => {
      if (error) {
        console.log('Error Info : ',error)
        req.flash('failureInfo','Failed ! Try again.')
        res.redirect("/register")
      }
      else {
        req.flash('successInfo', 'User registered successfully')
        res.redirect("/")
      }
    });
}
  
//SignIn
const signin = (req, res) => {
    Users.findOne({
      email: req.body.email,
    })
      // .populate("rssFeeds")
      .exec((error, user) => {
        if (error) {
          console.log("Error Info : "+error)
          req.flash('failureInfo','Failed ! Try again.')
          res.redirect("/")
          return
        }

        if (!user) {
          req.flash('failureInfo', 'Invalid Email Or Password !')
          res.redirect("/")            
          return 
        }
        if (user.oauth) {
          req.flash('failureInfo', 'Failed! Login with google.')
          res.redirect("/")            
          return 
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          req.flash('failureInfo', 'Invalid Email Or Password !')
          res.redirect("/")                      
          return
        }
  
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        req.session.accessToken=accessToken
        req.session.userId=user._id
        // res
        req.flash('successInfo', 'Logged in successfully')
        res.redirect('/profile')
      })
  };
  
  //SignOut
const signout = (req, res) => {
  try {
    res.redirect('/')
    req.session.destroy();
    
  } catch (error) {
    console.log("Error Info : ",error)
    res.redirect("/")
  }
}

//Google OAuth Login
const googleOAuthLogin=async (req,res,next)=>{

  const userInfo=req.googleUserInfo

  if(! userInfo.verified_email){
    req.flash('failureInfo', 'Google Email Not Verified !')
    res.redirect('/error')
  }
  else{
    // upsert the user
    Users.findOneAndUpdate({email:userInfo.email},{email:userInfo.email,oauth:true,oauth_access_token:req.googleAuthTokens.access_token,oauth_id_token:req.googleAuthTokens.id_token},{upsert:true,new:true})
    .exec((error, user) => {
      if (error) {
        console.log("Error Info : "+error)
        req.flash('failureInfo','Failed ! Try again.')
        res.redirect("/error")
        return
      }
      if(user){
        // create access token and bind with session
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 86400, // 24 hours
        });
  
        req.session.accessToken=accessToken
        req.session.userId=user._id

        // redirect back to app
        req.flash('successInfo', 'Logged in successfully')
        res.redirect('/profile')
      }
      
      else{
        req.flash('failureInfo','Failed ! Try again.')
        res.redirect("/error")
      }
    })
  }
}


export const authController={
  googleOAuthLogin,
  signup,
  signin,
  signout
}