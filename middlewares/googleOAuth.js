import axios from 'axios'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
// config .env
if(process.env.NODE_ENV!=='production'){
    dotenv.config()
}

export const getGoogleOAuthUrl=(req,res,next)=>{
    const googleOAuthRootUrl ='https://accounts.google.com/o/oauth2/v2/auth'
    const query_params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
        access_type:'offline',
        response_type:'code',
        prompt:'consent',
        scope:[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(" ")
    }

    const queryString=new URLSearchParams(query_params)
    req.googleOAuthUrl = googleOAuthRootUrl+'?'+queryString.toString()
    next()
    
}

export const getGoogleOAuthToken=async (req,res,next)=>{
    const code=req.query.code
    const url ='https://oauth2.googleapis.com/token'
    const query_params={
        code,
        client_id:process.env.GOOGLE_CLIENT_ID,
        client_secret:process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
        grant_type: 'authorization_code',

    }
    const queryString=new URLSearchParams(query_params)
    
    try {
        const result = await axios.post(url,queryString.toString(),{
                        headers:{
                            "Content-Type":'application/x-www-form-urlencoded'
                        }
                    })
        req.googleAuthTokens=result.data 
        next()
    } catch (error) {
        
        console.log("Error Info : "+error)
    }
}


export const getGoogleUserInfo=async (req,res,next)=>{
    const googleUserInfoFromIdToken=jwt.decode(req.googleAuthTokens.id_token)
    
    try {
        const result =await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+req.googleAuthTokens.access_token,{
            headers:{
                Authorization: 'Bearer '+ req.googleAuthTokens.id_token
            }
        })
        req.googleUserInfo=result.data
        next()
    } catch (error) {
        console.log("Error Info : "+error)
    }
}