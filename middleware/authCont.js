const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const authHeader = req.cookies.Authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (error, user) => {
    if (error) {
      return res.sendStatus(403);
    }

    req.useremail = user.email;
    next();
  });
}


 

module.exports = {
    authenticateToken: authenticateToken,
  };
  
