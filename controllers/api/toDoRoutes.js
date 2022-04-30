const router = require('express').Router();
const {ToDo,User} = require('../../models');

router.post("/",async (req,res)=>{
    try{
        console.log(req.body);
        const newToDo = await ToDo.create({
            name:req.body.toDoName,
            user_id:req.session.userId,
        })
        // const newToDo = await ToDo.create({
        //     name:"clean skillet",
        //     user_id:2,
        // })
        if (!newToDo){
            res.status(404).json({message:"bad request"});
            return;
        }
        console.log("hellow");
        res.json(newToDo);
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        console.log(req.session.userId)
        const toDos = await ToDo.findAll({
            where:{
                user_id:req.session.userId
            }
        });
        res.status(200).json(toDos);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;