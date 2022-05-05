const router = require("express").Router();
const {User,Assessment} = require("../../models")

router.post("/",async(req,res)=>{
    try{
        console.log("in it");
        console.log(req.body)
        console.log(req.session.userId);
        console.log(req.body.assessmentName)
        console.log(req.body.metric)
        const newAssessment = await Assessment.create({
        assessment_name:req.body.assessmentName,
        user_id:req.session.userId,
        metric:req.body.metric});
        res.json(newAssessment)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const assessments = await Assessment.findAll({
            where:{
                user_id:req.session.userId
            }
        });
        res.status(200).json(assessments)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;