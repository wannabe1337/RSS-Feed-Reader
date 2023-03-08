import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
                email: {type:String,required:true,unique:true},
                password: {type:String},
                oauth_access_token:{type:String,default:null},
                oauth_id_token:{type:String,default:null},
                oauth:{type:Boolean,required:true,default:false},
                rssfeeds:[{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "rssfeeds",
                }]
            })

export const Users = mongoose.model("users", userSchema)

