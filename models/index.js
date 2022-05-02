const User = require("./user")
const Habit = require("./habit")
const ToDo = require('./ToDo')
const Assessment = require("./assessment");
const AssessmentDay = require("./assessmentdays");

User.hasMany(Habit,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
})

Habit.belongsTo(User,{
    foreignKey:'user_id'
})

User.hasMany(ToDo,{
    foreignKey:'user_id',
    onDelete:"CASCADE"
})

ToDo.belongsTo(User,{
    foreignKey:'user_id'
})

User.hasMany(Assessment,{
    foreignKey:'user_id',
    onDelete:"CASCADE"
})

Assessment.belongsTo(User,{
    foreignKey:'user_id'
})

Assessment.hasMany(AssessmentDay,{
    foreignKey:'assessment_id',
    onDelete:"CASCADE"
})

AssessmentDay.belongsTo(Assessment,{
    foreignKey:'assessment_id'
})


module.exports = {User,Habit,ToDo,Assessment,AssessmentDay}