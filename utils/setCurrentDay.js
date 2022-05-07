const {UserQueueItemDay,UserQueueItem} = require("../models");

const getCurrentDate = ()=>{
    const dateObj = new Date();
    const date = {
        month:dateObj.getMonth()+1,
        date:dateObj.getDate(),
        year:dateObj.getFullYear()
    }
    return date;
}

const loadCurrentQueue = async (userId)=>{
    console.log(userId)
    const today=getCurrentDate()

    const currentDay = await UserQueueItemDay.findAll({
        where:{
            date:`${today.month}/${today.date}/${today.year}`
        }
    });
    
    console.log("here is the current day")
    console.log(currentDay)
    if(currentDay.length!==0){
        return currentDay;
    }
    const userQueueItems = await UserQueueItem.findAll({
        where:{
            user_id:userId
        }
    })
    for(let item of userQueueItems){
        console.log(item);
        const dayItem = await UserQueueItemDay.create({
            user_queue_item_id:item.id,
            date:`${today.month}/${today.date}/${today.year}`,
        })
    }
    // const newDay = await UserQueueItemDay.bulkCreate({

    // })
}

module.exports = {loadCurrentQueue,getCurrentDate}

