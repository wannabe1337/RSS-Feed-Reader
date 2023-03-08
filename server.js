// [---IMPORTS---]
//import modules 
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import flash from 'express-flash';

//import route
import {feedRouter} from'./routes/feedRoute.js';
import {homeRouter} from'./routes/homeRoute.js';
import { authRouter } from './routes/authRoute.js';
import { profileRouter } from './routes/profileRoute.js';

//import compiledModelsDB
import { compiledModelsDB } from './models/compiledModelsDB.js';
import { dbURI } from './config/dbConfig.js';

// [--CONFIG---]
// config .env
if(process.env.NODE_ENV!=='production'){
  dotenv.config()
}

//[---setting up server---] 
const server = express()
const port = process.env.PORT || 80

//set view-engine
server.set('view-engine','ejs')

// Set to use static middleware for 'public' dir
server.use(express.static('public'))

// parse requests of content-type - application/json
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));
//Set to use cors
const corsOptions = {
  origin: ["http://localhost:8081","http://127.0.0.1:8081"]
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.use(cors(corsOptions));

// Set to use cookieSession
server.use(session({
    name: "rss-feeder-session",
    secret: process.env.ACCESS_TOKEN_SECRET, // should use as secret environment variable
    resave:false,
    saveUninitialized:false,
    cookie  : {
      httpOnly: true,
      // secure: true,
      sameSite:'lax',
      // maxAge  : 15*60*1000 
    }

  })
)

// set to use express-flash.flash() [stores messages in the session]
server.use(flash())
server.use(function(req,res,next){
  res.locals.message = req.flash()
  next()
  
})


//Routes
server.use(feedRouter)
server.use(homeRouter)
server.use(authRouter)
server.use(profileRouter)


server.listen(port, () => {
  console.log(`RSS-FEED-READER app listening on port ${port}`)
})

// ------------------------------------------------------------------
//[--SETTING UP DATABASE---]
const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users

compiledModelsDB.mongoose.set('strictQuery', false);
compiledModelsDB.mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
//    initial();
  })
  .catch(error=> {
    console.error("Connection error : ",error);
    process.exit();
  });

  // function initial() {
    
  // }

