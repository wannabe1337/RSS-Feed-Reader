import Parser from 'rss-parser';
import { compiledModelsDB } from "../models/compiledModelsDB.js";

const RSSFeeds = compiledModelsDB.rssFeeds;
const Users=compiledModelsDB.users

//addFeedUrl
const linkFeedUrlToUser = async (req, res) => {
    if(!req.urlExists){
      try {
        const feedUrl = await RSSFeeds.create({
          title: req.feedTitle,
          url: req.body.feedUrl
        })
        
        req.feedUrlId=feedUrl._id
        
      } catch (error){
        console.log('Error Info : ',error);
        req.flash('failureInfo', 'Failed! Try again later.')
        res.redirect("/profile");
        return
      }  
    }

    try{      
      await Users.updateOne({_id:req.session.userId},{$addToSet:{rssfeeds:req.feedUrlId}})
      console.log(req.session.userId+" subscribed "+req.feedUrlId+"!")
    }
    catch(error){
      console.log('Error Info : ',error)
      req.flash('failureInfo', 'Failed! Try again later.')
      res.redirect("/profile")
      return
    }
    res.redirect("/profile");
    return
    

}
 
//fetchFeeds
const fetchFeeds = async (req, res) => {
  try {
    var rssFeed=await RSSFeeds.findOne({title: req.body.feedTitle})
    var feedUrl=rssFeed.url
  } catch (error) {
    res.send('<h3 style="margin:10%;text-align:center;color:lightcoral">Error: Try again later !</h3>');
  }
  const parser=new Parser()
  try{
    const feed= await parser.parseURL(feedUrl)
    
    var htmlResponse=""
    feed.items.forEach(function (item){
      htmlResponse+="<div class='news_item' onclick=\"window.open('"+item.link+"', '_blank')\">\
          <p class='news_title'>\
            "+item.title +"\
          </p>\
          <p class='description'>"+
            item.content +
          "....</p><br>\
          <span class='news_info'>\
            <p>"+item.creator+"</p>\
            <p>"+item.pubDate+"</p>\
          </span>\
        </div><br><br>"
    })
    htmlResponse+='#separator#\
      <form action="/profile/unsubscribe" method="post">\
          <input type="hidden" name="_csrf" value='+req.session.csrfToken+'>\
          <input type="hidden" name="feedTitle" value='+rssFeed._id+'>\
          <button type="submit" style="background-color: #ff2323">Unsubscribe</button>\
      </form>\
      #separator#\
      <form action="/profile/logout" method="post">\
        <input type="hidden" name="_csrf" value='+req.session.csrfToken+'>\
        <button type="submit" style="background-color:#ff2323">Logout</button>\
      </form>'

    res.send(htmlResponse)

  } catch (error) {
    console.log("Error Info : "+error)
    res.send('<h3 style="margin:10%;text-align:center;color:lightcoral">Error: Try again later !</h3>');
  }
}
  
  //Unsubscribe
const unlinkFeedUrlToUser = async (req, res) => {
  try{      
    await Users.updateOne({_id:req.session.userId},{$pull:{rssfeeds:req.body.feedTitle}})
      console.log(req.session.userId+" unsubscribed "+req.feedUrlId+"!")
  }
  catch(error){
    console.log('Error Info : ',error)
    req.flash('failureInfo', 'Failed! Try again later.')
    res.redirect("/profile")
    return
  }
  res.redirect("/profile");
  return
  
}

export const feedController={
    linkFeedUrlToUser,
    fetchFeeds,
    unlinkFeedUrlToUser
}