const router = require('express').Router();
const {User,Habit,UserHabit} = require("../../models")

router.post("/",async (req,res)=>{
    try{
        const oldHabit = await Habit.findAll({
            where:{
                habit_name:req.body.habitName
            }
        })
        console.log(oldHabit)
        let habitId;
        if (oldHabit.length !== 0){
            console.log
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
            user_id:req.session.userId,
        })

        res.json(newUserHabit)
    }catch(err){
        res.json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        console.log("in it")
        // const habits = await UserHabit.findAll({
        //     where:{
        //         user_id:req.session.userId
        //     },include:{model:Habit}
        // });
        const habits = await UserHabit.findAll({
            where:{
                user_id:req.session.userId
            },
            include:{
                model:Habit
            }
        })
        console.log("in it")
        res.status(200).json(habits)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;