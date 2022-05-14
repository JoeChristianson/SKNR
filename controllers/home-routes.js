const router = require('express').Router();
const {User, Assessment, UserQueueItemDay, UserAssessment, UserQueueItem, QueueItem, AssessmentDay} = require('../models');
const withAuth = require('../utils/auth');
const checkAssessments = require('../utils/checkAssessments')
const {getToDos} = require("../utils/getData");
const {getCurrentDate,loadCurrentAssessments} = require("../utils/setCurrentDay")

router.get("/",withAuth,async (req,res)=>{
    console.log("loading home")
    console.log(req.session.userId)
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
    await loadCurrentAssessments(req.session.userId);
    let today=getCurrentDate();
    const queue = await UserQueueItemDay.findAll({
        where:{
            date:`${today.month}/${today.date}/${today.year}`
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
    today = `${today.month}/${today.date}/${today.year}`
    res.render('home',{
        today, loggedin: req.session.logged_in,userToDos,username:userInfo.user_name,assessments,queue
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
        res.status(200).render("registration-success")
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

module.exports = router;
