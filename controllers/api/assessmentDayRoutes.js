const router = require('express').Router();
const {AssessmentDay} = require("../../models")

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

