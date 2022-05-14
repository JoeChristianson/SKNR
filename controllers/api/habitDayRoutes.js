const router = require("express").Router()
const {Habit,UserHabit,UserHabitDay}=require("../../models")

router.put('/:id',async (req,res)=>{
    try{
        console.log("here is the body")
        console.log(req.body)
        const userHabitDay = await UserHabitDay.findByPk(req.params.id);
        userHabitDay.set(req.body);
        await userHabitDay.save();
        console.log(userHabitDay);
        res.status(200).json(userHabitDay)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;