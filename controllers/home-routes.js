const router = require('express').Router();
const {User} = require('../models');
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
    res.render('home',{
        loggedin: req.session.logged_in,toDos,username:userInfo.user_name
    })
});

router.get('/login',(req,res)=>{
    if (req.session.logged_in){
        res.redirect('/');
        return
    }
    res.render('login')
})

module.exports = router;
