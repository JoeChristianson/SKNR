const {ToDo,UserToDo} = require("../models")

const getToDos = async (userId)=>{
    let list = await UserToDo.findAll({
        where:{
            user_id:userId
        },
        include:{model:ToDo}
    });
    console.log("these are the to dos")
    list = list.map(item=>item.dataValues)
    console.log(list)

    return list;
}

module.exports = {getToDos}