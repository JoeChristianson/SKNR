const { UserQueueItem, QueueItem } = require("../models")

const reorder = async (id,originalPosition,newPosition)=>{
    const allQueueItems = await UserQueueItem.findAll({
        where:{
            user_id:id
        },include:[{model:QueueItem}]
    })
    console.log(allQueueItems)
    allQueueItems.forEach(async item=>{
        console.log(`${item.queueitem.name} is in position ${item.ordinal}`)

        if (item.ordinal < originalPosition && item.ordinal<newPosition){
            return
        }
        if (item.ordinal> originalPosition&&item.ordinal>newPosition){
            return
        }
        if (item.ordinal === originalPosition){
            console.log(`${item.queueitem.name} needs to move. It's in position ${item.ordinal}`)
            item.set({ordinal:newPosition});
            await item.save();
            return
        }
        if (originalPosition<newPosition){
            console.log("decrementing")
            item.set({ordinal:item.ordinal-1});
            await item.save();
            return
        }
        else {
            console.log("incrementing")
            item.set({ordinal:item.ordinal+1});
            await item.save();
        }
    })
    allQueueItems.forEach(item=>{
        console.log(`${item.queueitem.name} is in position ${item.ordinal}`)
    })
}


module.exports = {reorder}