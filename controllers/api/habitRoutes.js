const router = require('express').Router();
const {User,Habit,UserHabit} = require("../../models")

router.post("/",async (req,res)=>{
    try{
        const oldHabit = await Habit.findAll({
            where:{
                habit_name:req.body.habitName
            }
        })
        let habitId;
        if (oldHabit){
            habitId = oldHabit[0].id
        }
        else{
            const newHabit = await Habit.create({
                habit_name:req.body.habitName,
                positive:req.body.positive,
                is_active:true,
            });
            habitId = newHabit.id
        }
        const newUserHabit = await UserHabit.create({
            habit_id:habitId,
            user_id:req.session.user_id,
        })

        res.json(newUserHabit)
    }catch(err){
        res.json(err)
    }
})


module.exports = router;