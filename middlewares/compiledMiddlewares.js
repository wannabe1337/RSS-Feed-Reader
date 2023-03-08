import { verifyToken } from "./authJWT.js";
import { genCSRFToken, verifyCSRF } from "./csrfVerifier.js";
import { getGoogleOAuthToken, getGoogleOAuthUrl, getGoogleUserInfo } from "./googleOAuth.js";
import { verifyFeedUrls } from "./verifyFeedUrls.js";
import { checkDuplicateEmail,checkEmailPasswordValidity } from "./verifySignUp.js";

export const middlewares={
    verifyToken,
    genCSRFToken,
    verifyCSRF,
    checkDuplicateEmail,
    checkEmailPasswordValidity,
    verifyFeedUrls,
    getGoogleOAuthUrl,
    getGoogleOAuthToken,    
    getGoogleUserInfo
}