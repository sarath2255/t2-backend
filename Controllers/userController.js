const users=require('../Models/userSchema')

const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    const {username,email,password,address, gender}=req.body
    console.log(username,email,password,address,gender);

    try{
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(400).json('User already exists')
        }
        else{
            const newUser=new users({
                username,email,password,address,gender
            })
            await newUser.save()
            res.status(200).json('User created successfully...')
        }
    }
    catch(err){
        res.status(500).json('Server error'+err.message)
    }
   
}

exports.login=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await users.findOne({email,password})
        if(user){
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})
        }
        else{
            
            res.status(401).json('Invalid user')
        }
    }
    catch(err){
        res.status(500).json('Server error'+err.message)
    }
   
}