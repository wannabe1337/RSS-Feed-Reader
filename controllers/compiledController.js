import { authController } from "./authController.js"
import { feedController } from "./feedController.js"
import { profileController } from "./profileController.js"

const signup=authController.signup
const signin=authController.signin
const signout=authController.signout
const googleOAuthLogin=authController.googleOAuthLogin

const linkFeedUrlToUser=feedController.linkFeedUrlToUser
const fetchFeeds=feedController.fetchFeeds
const fetchSubs =profileController.fetchSubs
const unlinkFeedUrlToUser=feedController.unlinkFeedUrlToUser

export const controllers={
    signup,
    signin,
    signout,
    googleOAuthLogin,

    linkFeedUrlToUser,
    fetchFeeds,
    fetchSubs,
    unlinkFeedUrlToUser
}