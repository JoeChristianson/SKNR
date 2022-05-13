const { AssessmentDay } = require("../models");
const {getCurrentDate} = require("../utils/setCurrentDay")

const withAuth = async (req,res,next)=>{
    if (!req.session.loggedIn){
        res.redirect('/login');
        return
    }
    const today=getCurrentDate()
    const assessed = await AssessmentDay.findAll({
        where:{
            date:`${today.month}/${today.date}/${today.year}`,
            value:-1
        }
    })
    console.log("This is the assessed: " + assessed)
    // if (assessed.length !== 0){
    //     res.redirect("/assessment");
    //     return
    // }
    next();
}



module.exports = withAuth;