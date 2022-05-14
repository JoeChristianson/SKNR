const sequelize = require("../config/connection");
const seedHabits = require("./habitData")

const seedAll = async ()=>{
    await sequelize.sync({force:true});
    await seedHabits();
}

seedAll()