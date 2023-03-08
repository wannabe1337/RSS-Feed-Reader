import express from 'express';
import { middlewares } from '../middlewares/compiledMiddlewares.js';
import { controllers } from '../controllers/compiledController.js';

export const feedRouter= express.Router()

feedRouter
    .post('/profile/fetchFeeds',middlewares.verifyToken,middlewares.genCSRFToken,controllers.fetchFeeds)
    
    .post('/profile/subscribe',middlewares.verifyToken,middlewares.verifyCSRF,middlewares.verifyFeedUrls,controllers.linkFeedUrlToUser)
    .post('/profile/unsubscribe',middlewares.verifyToken,middlewares.verifyCSRF,controllers.unlinkFeedUrlToUser)