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
                user_id:req.session.userId,
                isComplete:true
            }
        });
        res.status(200).json(toDos);
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/completed",async (req,res)=>{
    try{
        console.log(req.session.userId)
        const toDos = await ToDo.findAll({
            where:{
                user_id:req.session.userId,
                isComplete:1
            }
        });
        res.status(200).json(toDos);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/',async (req,res)=>{
    console.log(req.body.toDoId);
    console.log(req.body.isComplete)
    const response = await ToDo.update({
        isComplete:req.body.isComplete
    },{
        where:{
            id: req.body.toDoId
        }
    })
    console.log(response)
    res.json(response)
})

module.exports = router;