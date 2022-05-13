const router = require('express').Router();
const {AssessmentDay, UserAssessment, Assessment} = require("../../models")
const {getCurrentDate,loadCurrentAssessments} = require("../../utils/setCurrentDay")


router.post("/",async (req,res)=>{
    try{
        const newAssessmentDay = AssessmentDay.create({
            assessment_value:req.body.assessment_value,
            assessment_id:req.body.assessment_id,
            date:req.body.date
        })
        res.status(200).json(err)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        const today=getCurrentDate()
        const assessmentDays = await AssessmentDay.findAll({
            where:{
                date:`${today.month}/${today.date}/${today.year}`,

            },
            include:{model:UserAssessment,
                where:{user_id:req.session.userId},
                include:{model:Assessment}
            }
        });
        res.status(200).json(assessmentDays)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router