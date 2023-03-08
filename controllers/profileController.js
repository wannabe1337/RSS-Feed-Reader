import { compiledModelsDB } from "../models/compiledModelsDB.js";

const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users


//fetchFeeds
const fetchSubs = async (req, res,next) => {
    try {        
        const user=await Users.find({_id:req.session.userId},{rssfeeds:1,_id:0}).populate("rssfeeds","title")
        req.feedTitle=user[0].rssfeeds.map((feed)=>{return feed.title})
    } catch (error) {
        console.log("Error Info : ",error)

    }
    next()
  }
  
export const profileController={
    fetchSubs
}