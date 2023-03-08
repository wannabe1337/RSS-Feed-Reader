import mongoose from "mongoose";
import { Users } from "./userModel.js";
import { RSSFeeds } from "./rssFeedModel.js";

// mongoose.Promise = global.Promise;

export const compiledModelsDB = {};

compiledModelsDB.mongoose = mongoose;
compiledModelsDB.users =Users
compiledModelsDB.rssFeeds = RSSFeeds

// compiledModelsDB.ROLES = ["user", "admin", "moderator"];
