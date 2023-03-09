### express Js : 
    https://www.youtube.com/watch?v=cMbJ8hatqJ8&list=PLyuRouwmQCjne87u8XUdOM5oCl7vI2vVL

### Node.js Express and MongoDB: Login and Registration example
    https://www.bezkoder.com/node-js-express-login-mongodb/


### OAuth 2.0 and OpenID Connect :
    https://www.youtube.com/watch?v=996OiexHze0
    
    https://www.telerik.com/blogs/implementing-oauth-2-using-node-js

    https://www.youtube.com/watch?v=Qt3KJZ2kQk0

### DIR_Structure
    views  --> contains views rendered by view engines i.e. ejs
    models --> Database models/schema
    public --> To serve static files such as images, CSS files, and JavaScript 
               files, use the express.static built-in middleware function in Express.
    routes --> contains different routes for REST style urls
    config --> contains configuration for auth and Database
    
    controllers --> Server side controllers to implement different functionalities
    middlewares --> contains middlewares to support controllers

    node_modules --> contains dependencies for the project

### .env file:
    contains environment variable and secrets (meant to be stored locally and not be made public)
        ACCESS_TOKEN_SECRET=[64-byte secret in hex]
        PORT=3000
        USER_NAME=[mongo_db_username]           
        DB_PASSWORD=[mongo_db_password]
        GOOGLE_CLIENT_ID=[google-clientId].apps.googleusercontent.com
        GOOGLE_CLIENT_SECRET=[google-client-secret]
        GOOGLE_OAUTH_REDIRECT=[redirect-to-server-side-access-code-handler]

### Start Node.js in production
    https://maximorlov.com/start-node-js-in-production/