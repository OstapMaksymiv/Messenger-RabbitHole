import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
    console.log('started creating token');
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({
        userId,
        isAdmin:false
    },process.env.JWT_SECRET,{expiresIn:age})
    res.cookie("token",token,{
        // httpOnly: true,
        maxAge:age,
        secure: true, // Обов'язково для sameSite: 'None'
        sameSite: 'None'
    })
    

}
export default generateToken;