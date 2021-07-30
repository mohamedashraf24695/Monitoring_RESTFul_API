const router = require("express").Router();
const Validation = require("../Controllers/validations");
const Registeration = require("../Controllers/registeration");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const validRegister = await Validation.validateRegisteration(req.body);

    if (validRegister.error === true) {
      return res
        .status(validRegister.statusCode)
        .json({ message: validRegister.message });
    }

    const newUserCreation = await Registeration.registerNewUser(req.body);

    res.status(newUserCreation.statusCode).json({
      message: newUserCreation.message,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await Validation.validatelogin(req.body);

    if (result.error === false) {
      const user = await Registeration.hashedUserGen(req.body);

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res.cookie("Authorization", "Bearer " + accessToken ,{ maxAge: parseInt(process.env.TOKEN_MAX_AGE_IN_SEC*1000, 10) }); 
    }

    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(400).json(error);
  }
});



router.post("/logout",async(req,res)=>{

  try{
    res.clearCookie("Authorization");
    res.status(200).json("Cookie is destroyed! You are logout Successfully");

  }catch(error){

    res.status(400).json(error);

  }
});

module.exports = router;
