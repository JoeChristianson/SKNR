const {AssessmentDay,Assessment} = require("../models");

const checkAssessments = async (req,res,next)=>{
    const assessments = await Assessment.findAll({
        where:{user_id:req.session.user_id}
    });
    console.log(assessments)
    if (assessments.length>1){
        res.redirect('/assessment');
    }
    else next();
}

module.exports = checkAssessments;