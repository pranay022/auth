const bcrypt = require("bcrypt");
const db =  require("../models/index");
const jwt = require("jsonwebtoken");
// const User = db;

const signup = async (req, res) => {
 try {
   const { name, email, password } = req.body;
   const data = {
     name,
     email,
     password: await bcrypt.hash(password, 10),
   };
   const user = await db.Auth.create(data);

   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};

//login authentication
const login = async (req, res) => {
 try {
const { email, password } = req.body;
   const user = await db.Auth.findOne({
     where: {
     email: email
   } 
   });
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);
     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

module.exports = {
 signup,
 login,
};