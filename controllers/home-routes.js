const router = require('express').Router();
const {User, Assessment, UserQueueItemDay, UserAssessment, UserQueueItem, QueueItem, AssessmentDay, UserHabitDay,UserHabit,Habit} = require('../models');
const withAuth = require('../utils/auth');
const checkAssessments = require('../utils/checkAssessments')
const {getToDos} = require("../utils/getData");
const {getCurrentDate,loadCurrentAssessments,loadCurrentHabits} = require("../utils/setCurrentDay")

router.get("/",withAuth,async (req,res)=>{
    console.log(req.session)
    // const toDos = await getToDos(req.session.userId);
    const userToDos = await getToDos(req.session.userId);
    const userInfo = await User.findOne({
        where:{
            id:req.session.userId
        }
    })
    const assessments = await UserAssessment.findAll({
        where:{
            user_id:req.session.userId
        }
    })
    await loadCurrentAssessments(req.session.userId,req.session.timeObj);
    await loadCurrentHabits(req.session.userId,req.session.timeObj);
    let today=getCurrentDate();
    const queue = await UserQueueItemDay.findAll({
        where:{
            date:req.session.timeObj.absoluteDate
        },
        order:[
            ['user_queue_item',"ordinal","ASC"],
            // ['user_queue_item',"queue_item_id","DESC"]
        ],
        include:{model:UserQueueItem,
            where:{user_id:req.session.userId,}
            ,include:{model:QueueItem},
        },
    })
    let habits = await UserHabitDay.findAll({
        where:{
            date:req.session.timeObj.absoluteDate
        },
        include:{model:UserHabit,
            where:{user_id:req.session.userId,}
            ,include:{model:Habit},
        },
    })

    habits = habits.map(habit=>{
        return {
            uhd_id:habit.dataValues.id,
            isOn:habit.dataValues.isOn,
            isComplete:habit.dataValues.isComplete,
            name:habit.user_habit.habit.dataValues.habit_name
        }
    })
    console.log("here are the habits")
    habits = habits.filter(habit=>habit.isOn)
    console.log(habits)
    today = req.session.timeObj.absoluteDate;
    res.render('home',{
        habits,today, loggedin: req.session.logged_in,userToDos,username:userInfo.user_name,assessments,queue
    })
});

router.get('/login',(req,res)=>{
    if (req.session.logged_in){
        res.redirect('/');
        return
    }
    res.render('login')
})

router.get("/registration-success",(req,res)=>{
    try{
        res.status(200).render("registration-success",{layout:"info-page.handlebars"})
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/assessment",async (req,res)=>{
    try{
        const today=getCurrentDate()
        const assessmentDays = await AssessmentDay.findAll({
            where:{
                date:`${today.month}/${today.date}/${today.year}`
            },
            include:{model:UserAssessment,
            where:{
                user_id:req.session.userId
            },
            include:{model:Assessment}
        }
        })
        console.log(assessmentDays[0])
        const results = assessmentDays.map((assessment)=>{
            return {
                id:assessment.id,
                assessmentId:assessment.assessment_id,
                name:assessment.user_assessment.assessment.assessment_name,
                metric:assessment.user_assessment.assessment.metric,
                grade:assessment.user_assessment.assessment.metric==="grade"?true:false,
                boolean:assessment.user_assessment.assessment.metric==="boolean"?true:false,
                amount:assessment.user_assessment.assessment.metric==="amount"?true:false,
            }
        })
        console.log(results)
        res.status(200).render("assessment",{results})
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/analysis",withAuth,async (req,res)=>{


    let habits = await UserHabit.findAll({
        where:{
            user_id:req.session.userId
        },
        include:{model:Habit}
    });
    habits = habits.map(uhabit=>{
        return {
            id:uhabit.dataValues.id,
            name:uhabit.dataValues.habit.dataValues.habit_name
        }
    })
    let assessments = await UserAssessment.findAll({
        where:{
            user_id:req.session.userId
        },
        include:{model:Assessment}
    });
    assessments = assessments.map(uAssessment=>{
        return {
            id:uAssessment.dataValues.id,
            name:uAssessment.dataValues.assessment.dataValues.assessment_name
        }
    })
    res.render("analysis",{habits,assessments})
})



module.exports = router;
