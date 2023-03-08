import Parser from 'rss-parser';
import { compiledModelsDB } from '../models/compiledModelsDB.js';

const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users

export const verifyFeedUrls = async (req,res,next) => {
    // check validity of RSS-Feed-URL
    const parser=new Parser()
    try{
        const feed= await parser.parseURL(req.body.feedUrl)
        req.feedTitle=feed.title

    } catch (error) {
        req.flash('failureInfo', error)
        res.redirect('/profile');
        return
    }

    // CheckDuplicate
    RSSFeeds.findOne({
        url: req.body.feedUrl
    }).exec((error, url) => {
        if (error) {
            console.log("Error Info : "+error)
            req.flash('failureInfo', 'Failed! Try again later.')
            res.redirect("/profile")
            return
        }
        if (url) {
            req.urlExists=true
            req.feedUrlId=url._id
        }
        else{
            req.urlExists=false
        }
        next()
    })
}