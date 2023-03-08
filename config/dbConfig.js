import dotenv from 'dotenv';
if(process.env.NODE_ENV!=='production'){
    dotenv.config()
}
const DB="rssFeeder"
const username=process.env.USER_NAME
const password=process.env.DB_PASSWORD
export const dbURI = "mongodb+srv://"+username+":"+password+"@cluster0.ltwppgh.mongodb.net/"+DB

  
  