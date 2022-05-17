const router = require("express").Router();
const {User,Assessment,UserAssessment} = require("../../models")

router.post("/",async(req,res)=>{
    try{
        let existingAssessment = await Assessment.findAll({
            where:{
                assessment_name:req.body.assessmentName
            }
        }
        );
        if (existingAssessment.length===0){
            existingAssessment[0] = await Assessment.create({
                assessment_name:req.body.assessmentName,
                metric:req.body.metric
            })
        }
        const newUserAssessment = await UserAssessment.create({
            user_id:req.session.userId,
            assessment_id:existingAssessment[0].id
        })
        res.json(existingAssessment)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const assessments = await UserAssessment.findAll({
            where:{
                user_id:req.session.userId
            },include:{model:Assessment}
        });
        res.status(200).json(assessments)
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;