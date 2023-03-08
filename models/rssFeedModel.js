import mongoose from "mongoose";

const rssFeedSchema= new mongoose.Schema({
                title: String,
                url:String
            })

export const RSSFeeds = mongoose.model("rssfeeds",rssFeedSchema)

