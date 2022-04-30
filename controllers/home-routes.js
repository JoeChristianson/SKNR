const router = require('express').Router();
const {User} = require('../models');
const withAuth = require('../utils/auth');
const {getToDos} = require("../utils/getData");

router.get("/",withAuth,async (req,res)=>{

    // const toDos = await getToDos(req.session.userId);
    const toDos = await getToDos(req.session.userId);

    let testText = "teat"
    res.render('home',{
        loggedin: req.session.logged_in,toDos
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
