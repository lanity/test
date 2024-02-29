import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const createToken = (userId) => {
    return jwt.sign( {userId }, process.env.JWT_SECRET_KEY, {
        expiresIn : '1d',
    })
}

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err, decoded) => {
            if(err) {
                res.redirect('/login')
            }else {
                next()
            }
        })
    }else {
        res.redirect('/login')
    }
}

export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.locals.user= null;
          next()
        } else {
          let user = await User.findById(decoded.userId)
          res.locals.user = user
          next();
        }      
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

export const isLoggedin = ( req, res, next) => {
  
  if(!res.locals.user){
    next()
  }else{
    res.redirect('/')
  }
    
}
