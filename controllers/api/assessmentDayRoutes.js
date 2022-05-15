const router = require('express').Router();
const {AssessmentDay, UserAssessment, Assessment} = require("../../models")
const {getCurrentDate,loadCurrentAssessments} = require("../../utils/setCurrentDay")


router.post("/",async (req,res)=>{
    try{
        const newAssessmentDay = AssessmentDay.create({
            assessment_value:req.body.assessment_value,
            assessment_id:req.body.assessment_id,
            date:req.session.timeObj
        })
        res.status(200).json(err)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        const assessmentDays = await AssessmentDay.findAll({
            where:{
                date:req.session.timeObj,

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

router.put("/",async (req,res)=>{
    try{
        console.log("in it")
        const arr = req.body.changes;
        console.log(arr)
        // const results = await AssessmentDay.bulkCreate(
        //     arr,
        //     {
        //       updateOnDuplicate: ["value",`created_at`,`updated_at`],
        //     }
        //   );
        arr.forEach(async (ass)=>{
            const item = await AssessmentDay.findByPk(ass.id);
            item.set({value:ass.value});
            await item.save()
            console.log(item)
        })
        res.status(200).json({})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router