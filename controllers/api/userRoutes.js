const router = require('express').Router();
const {User} = require("../../models")

router.post("/",async (req,res)=>{
    try{
        console.log(req.body)
        const newUser = await User.create({
            user_name:req.body.username,
            email:req.body.email,
            password:req.body.password,
        })
        console.log(newUser)
        res.json(newUser)
    }catch(err){
        res.json(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const userData = await User.findOne({
            where:{
                email: req.body.email,
            }
        });

        if(!userData){
            res.status(400).json({message:"Incorrect email or password."});
            return;
        }
        const validPassword = userData.checkPassword(req.body.password)
        if (!validPassword){
            res.status(400).json({message:'Incorrect email or password'});
            return;
        }
        req.session.save(async ()=>{
            req.session.loggedIn = true;
            req.session.userId = userData.getDataValue("id");
            console.log(req.session.userId);
            res.status(200).json({user:userData,message: 'You are now logged in'})
        })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/logout",(req,res)=>{
    req.session.loggedIn = false;
    res.status(200).json({message:'You are now logged out.'})
})

module.exports = router;