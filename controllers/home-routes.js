const router = require('express').Router();
const {User, Assessment, UserQueueItemDay, UserAssessment, UserQueueItem, QueueItem} = require('../models');
const withAuth = require('../utils/auth');
const checkAssessments = require('../utils/checkAssessments')
const {getToDos} = require("../utils/getData");

router.get("/",withAuth,async (req,res)=>{

    // const toDos = await getToDos(req.session.userId);
    const toDos = await getToDos(req.session.userId);
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
    const queue = await UserQueueItemDay.findAll({
        order:[
            ['user_queue_item',"ordinal","ASC"],
            // ['user_queue_item',"queue_item_id","DESC"]
        ],
        include:{model:UserQueueItem,include:{model:QueueItem},
        where:{
            user_id:req.session.userId
        },
    },
})
    queue.forEach(i=>{
        console.log(i)
    })
    res.render('home',{
        loggedin: req.session.logged_in,toDos,username:userInfo.user_name,assessments,queue
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

module.exports = router;
