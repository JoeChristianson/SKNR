const router = require("express").Router();
const {User,Assessment} = require("../../models")

router.post("/",async(req,res)=>{
    try{
        const newAssessment = await Assessment.create({
        assessment_name:req.body.assessment_name,
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