import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const modifyProfile = async(req,res,next) => {
  
  try{
    console.log("modifyProfile Before tryctach")
    console.log("Eddig meg oeks!")
    let currentUser = await User.findOne({username:req.body.currentUsername});// JSON.parse(localStorage.getItem("currentUser"));
    
    if(currentUser === null){
      console.log("404 Not found!")
      return next(createError(404, "Inexsitent user!"));
    }
    
    currentUser.isSeller = req.body.isSeller;
    if(req.body.username!=""){
      currentUser.username=req.body.username;
    }
    if(req.body.password!=""){
      currentUser.password=req.body.password;
    }
    if(req.body.email!=""){
      currentUser.email=req.body.email;
    }
    if(req.body.country!=""){
      currentUser.country=req.body.country;
    }
    if(req.body.phone!=""){
      currentUser.phone=req.body.phone;
    }

    //await User.deleteOne( {"_id": currentUser._id});
    await currentUser.save();

    res.status(201).send("User has been modified.");

    res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");

  }catch(err){
    console.log(err)
    next(err);
  }
}

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
