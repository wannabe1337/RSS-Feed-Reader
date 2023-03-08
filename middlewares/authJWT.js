import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.session.accessToken;
  
    if (!token) {
      req.flash('failureInfo','No token provided!')
      return res.redirect('/error')
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        req.flash('failureInfo','Unauthorized!')
        return res.redirect('/error')
      }
      req.userId = decoded.id;
      next();
    });
  };