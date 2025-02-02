import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js';
export const login  = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"Credentials are incorrect"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(404).json({message:"Credentials are incorrect"})
        }
      
        // generateToken(user._id,res)
        
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({
            userId:user._id,
            isAdmin:false
        },process.env.JWT_SECRET,{expiresIn:age})
        
        res
        .cookie("token",token,{
            httpOnly: true,
            maxAge:age,
            secure: true, // Обов'язково для sameSite: 'None'
            sameSite: 'None'
        })
        .status(200)
        .json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic:user.profilePic
        });  
    } catch (error) {
   
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const register  = async (req,res) => {
    const {fullName, username, password, confirmPassword,gender} = req.body;
    try {
        if(password !== confirmPassword){
            return res.status(400).json({message:"Passwords don't match"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })
        if(newUser){
            
            await newUser.save()
            const age = 1000 * 60 * 60 * 24 * 7;
            const token = jwt.sign({
                userId:newUser._id,
                isAdmin:false
            },process.env.JWT_SECRET,{expiresIn:age})
            
            res
            .cookie("token",token,{
                httpOnly: true,
                maxAge:age,
                secure: true, // Обов'язково для sameSite: 'None'
                sameSite: 'None'
            })
            .status(200).json(
                {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                    profilePic:newUser.profilePic
                }
                )
        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
      
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout  =  (req,res) => {
    try {
        res.clearCookie("token").status(200).json({message:"logout successful"})
        
    } catch (error) {
       
        res.status(500).json({message:"Internal Server Error"})
    }
}
