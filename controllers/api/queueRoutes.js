const router = require("express").Router();
const {QueueItem,UserQueueItem, UserQueueItemDay} = require("../../models")
const {getCurrentDate} = require("../../utils/setCurrentDay")
const {reorder} = require("../../utils/queuefunctions")

router.post("/",async (req,res)=>{
    try{
        let existingQueueItem = await QueueItem.findAll({
            where:{
                name:req.body.name
            }
        }
        );
        if (existingQueueItem.length===0){
            console.log("none")
            existingQueueItem[0] = await QueueItem.create({
                name:req.body.name,
            })
        }
        const newUserQueueItem = await UserQueueItem.create({
            user_id:req.session.userId,
            queue_item_id:existingQueueItem[0].id,
            ordinal:req.body.ordinal
        })
        console.log(newUserQueueItem);
        res.json(existingQueueItem)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        const userQueueItems = await UserQueueItem.findAll({
            where:{
                user_id:req.session.userId
            },
            include:[{model:QueueItem}]
    })
        res.status(200).json(userQueueItems);
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/today",async(req,res)=>{
    const today = getCurrentDate();
    const todayQueue = await UserQueueItemDay.findAll({
        where:{
            date:`${today.month}/${today.date}/${today.year}`
        },
    include:[{model:UserQueueItem},{model:QueueItem}]
    })
    res.status(200).json(todayQueue)
})

router.put("/reorder",async (req,res)=>{
    try{
        console.log(req.session.userId)
        await reorder(req.session.userId,3,4)
        res.status(200).json("working")
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;