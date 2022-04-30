const {ToDo} = require("../models")

const getToDos = async (userId)=>{
    let list = await ToDo.findAll({
        where:{
            user_id:userId
        }
    });

    list = list.map(item=>item.dataValues)
    console.log("list is type of "+typeof list)
    console.log(typeof [1])
    return list;
}

module.exports = {getToDos}