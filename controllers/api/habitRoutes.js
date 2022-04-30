const router = require('express').Router();
const {User,Habit} = require("../../models")

router.post("/",async (req,res)=>{
    try{
        const newUser = await User.create(req.body)
        res.json(newUser)
    }catch(err){
        res.json(err)
    }
})


module.exports = router;