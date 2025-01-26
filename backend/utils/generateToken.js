import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET,{expiresIn:age})
    res.cookie("token",token,{
        httpOnly: true,
        maxAge:age,
    })
    

}
export default generateToken;