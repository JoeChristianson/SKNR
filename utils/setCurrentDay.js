const res = require("express/lib/response");
const {UserQueueItemDay,UserQueueItem, AssessmentDay, UserAssessment, UserHabitDay, UserHabit} = require("../models");

const getCurrentDate = ()=>{
    const dateObj = new Date();
    const date = {
        month:dateObj.getMonth()+1,
        date:dateObj.getDate(),
        year:dateObj.getFullYear()
    }
    return date;
}

const loadCurrentQueue = async (userId,timeObj)=>{
    console.log(timeObj)
    console.log(userId)
    const currentDay = await UserQueueItemDay.findAll({
        where:{
            date:timeObj.absoluteDate
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
            queue_item_id:item.queue_item_id,
            date:timeObj.absoluteDate,
        })
        console.log(dayItem)
    }
    // const newDay = await UserQueueItemDay.bulkCreate({

    // })
}

const loadCurrentAssessments = async (userId,timeObj)=>{
    const currentDay = await AssessmentDay.findAll({
        where:{
            date:timeObj.absoluteDate
        },include:{model:UserAssessment,where:{user_id:userId}}
    });
    if(currentDay.length!==0){
        return currentDay;
    }
    const userAssessments = await UserAssessment.findAll({
        where:{
            user_id:userId
        }
    })
    for(let item of userAssessments){
        const dayItem = await AssessmentDay.create({
            assessment_id:item.id,
            date:timeObj.absoluteDate,
            value:-1
        })
        console.log(dayItem)
    }

}

const loadCurrentHabits = async (userId,timeObj)=>{
    console.log("this is the user id")
    console.log(userId)

    const currentDay = await UserHabitDay.findAll({
        where:{
            date:timeObj.absoluteDate
        },include:{model:UserHabit,where:{user_id:userId}}
    });
    if(currentDay.length!==0){
        return currentDay;
    }
    const userHabits = await UserHabit.findAll({
        where:{
            user_id:userId
        }
    })
    for(let item of userHabits){
        const dayItem = await UserHabitDay.create({
            user_habit_id:item.id,
            date:timeObj.absoluteDate,
            isOn:Math.random()>.5?true:false
        })
        console.log(dayItem)
    }

}

// const loadCurrentHabits = async ()

module.exports = {loadCurrentQueue,getCurrentDate,loadCurrentAssessments,loadCurrentHabits}

