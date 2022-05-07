const router = require("express").Router();
const {User,Assessment,UserAssessment} = require("../../models")

router.post("/",async(req,res)=>{
    try{
        console.log("in it");
        console.log(req.body)
        console.log(req.session.userId);
        console.log(req.body.assessmentName)
        console.log(req.body.metric)
        let existingAssessment = await Assessment.findAll({
            where:{
                assessment_name:req.body.assessmentName
            }
        }
        );
        console.log(existingAssessment)
        if (existingAssessment.length===0){
            console.log("none")
            existingAssessment[0] = await Assessment.create({
                assessment_name:req.body.assessmentName,
                metric:req.body.metric
            })
        }
        console.log(existingAssessment);
        const newUserAssessment = await UserAssessment.create({
            user_id:req.session.userId,
            assessment_id:existingAssessment[0].id
        })
        // const newAssessment = await Assessment.create({
        // assessment_name:req.body.assessmentName,
        // user_id:req.session.userId,
        // metric:req.body.metric});
        // res.json(newAssessment);
        res.json(existingAssessment)
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