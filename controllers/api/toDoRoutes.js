const router = require('express').Router();
const {ToDo,User,UserToDo} = require('../../models');

router.post("/",async (req,res)=>{
    try{
        let existingToDo = await ToDo.findAll({
            where:{
                name:req.body.toDoName
            }
        }
        );
        console.log(existingToDo)
        if (existingToDo.length===0){
            console.log("none")
            existingToDo[0] = await ToDo.create({
                name:req.body.toDoName,
            })
        }
        console.log(existingToDo);
        const newUserToDo = await UserToDo.create({
            user_id:req.session.userId,
            todo_id:existingToDo[0].id
        })
        console.log(newUserToDo);
        res.json(existingToDo)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        const userToDos = await UserToDo.findAll({
            where:{
                user_id:req.session.userId
            },
            include:[{model:ToDo}]
        })
        res.status(200).json(userToDos);
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
    console.log(req.body.userToDoId);
    console.log(req.body.isComplete)
    const response = await UserToDo.update({
        isComplete:req.body.isComplete
    },{
        where:{
            id: req.body.userToDoId
        }
    })
    console.log(response)
    res.json(response)
})

module.exports = router;