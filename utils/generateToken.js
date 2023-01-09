const jwt =require('jsonwebtoken')


//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1m',

    })
}

module.exports={generateToken}
