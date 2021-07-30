const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


const registerRequirmentsValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data).error;
};

const validationErrorMessage = (data) => {
  return registerRequirmentsValidation(data).details[0].message;
};

const emailExistance = async (data) => {
  const emailExist = await User.findOne({ email: data });


  if (emailExist !== null ) {
    return true;
  }

  return false;
};

const loginRequirmentsValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data).error;
};


const loginValidErrorMessage = (data) => {
  return loginRequirmentsValidation(data).details[0].message;
};


const passwordValidation = async (incomeUserEmail , passedPassword)=>{

const user = await User.findOne({ email: incomeUserEmail });
const incomeHashedPassword = await user.password ; 

const validPass = await bcrypt.compare(passedPassword,incomeHashedPassword);

if(validPass){
  return true ; 
}
else {
  return false ;
}


}


const validateRegisteration = async (data)=>{

  if (registerRequirmentsValidation(data)) {

    return {message: validationErrorMessage(data) ,
            error : true ,
            statusCode:400};

  }


  if ((await emailExistance(data.email)) === true) {

    return{message: "Email is already exists" ,
      error : true ,
      statusCode:400};

  }

  else {
    return {error : false}
  }


}





const validatelogin = async (data)=>{

  if (loginRequirmentsValidation(data)) {

    return {message: loginValidErrorMessage(data) ,
            error : true ,
            statusCode:400};

  }


  if (!(await emailExistance(data.email))) {

    return{message: "Email is not exists" ,
      error : true ,
      statusCode:400};

  }

  const validPass = await passwordValidation(
    data.email,
    data.password
  );

  if (!validPass) {

    return {message:"Failing to login" ,
      error : true ,
      statusCode:400};

}


return {message:"Succuss login " ,
      error : false ,
      statusCode:200};

};









module.exports = {

  validateRegisteration:validateRegisteration,
  validatelogin:validatelogin
};
