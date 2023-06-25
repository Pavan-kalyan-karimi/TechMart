import User from "../models/userModel.js"
import asyncHandler from "../middleware/asyncHandler.js"
import jwt from "jsonwebtoken"

//@desc   Auth user & get token
//route    POST /api/users/login
//access   public 
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });
        
        //Set jwt as HTTP Only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
 

//@desc   register user 
//route    POST /api/users
//access   public 
const registerUser = asyncHandler( async (req, res) => {
    res.send("register user")
})
 


//@desc   logout user & remove cookie
//route    POST /api/users/logout
//access   private 
const logoutUser = asyncHandler( async (req, res) => {
    res.send("logout user")
})
 

//@desc   get user profile
//route    GET /api/users/profile
//access   private 
const getUserProfile = asyncHandler( async (req, res) => {
    res.send("get user profile")
})
 

//@desc   update user profile
//route    PUT /api/users/profile/
//access   private 
const updateUserProfile = asyncHandler( async (req, res) => {
    res.send("update user profile")
})
 

//@desc  Get users
//route    GET /api/users/
//access   private/admin 
const getUsers = asyncHandler( async (req, res) => {
    res.send("get users")
})
 

//@desc   get user profile by id
//route    GET /api/users/:id
//access   private/admin 
const getUserById = asyncHandler( async (req, res) => {
    res.send("get user by id")
})
 

//@desc   delete user 
//route    DELETE /api/users/:id
//access   private/admin 
const deleteUser = asyncHandler( async (req, res) => {
    res.send("delete user profile")
})
 

//@desc   update user profile
//route    PUT /api/users/:id
//access   private/admin 
const updateUser = asyncHandler( async (req, res) => {
    res.send("update user profile")
})
 
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser

}