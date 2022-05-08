const User = require("./user")
const Habit = require("./habit")
const UserHabit = require("./userHabits")
const ToDo = require('./ToDo')
const Assessment = require("./assessment");
const AssessmentDay = require("./assessmentdays");
const UserToDo = require("./userToDo.js")
const UserAssessment = require("./userAssessment")
const UserQueueItem = require("./userQueueItem");
const QueueItem = require("./queueItem");
const UserQueueItemDay = require("./userQueueItemDay")

// look at producttags to figure this out from homework

User.belongsToMany(Habit,{
    through:{
        model:UserHabit,
        unique:false
    },
    as: "habitUsers"
})

Habit.belongsToMany(User,{
    through:{
        model:UserHabit,
        unique:false
    },
    as:'userHabits'
})

User.belongsToMany(Assessment,{
    through:{
        model:UserAssessment,
        unique:false
    },
    as: "AssessmentUsers"
})

ToDo.hasMany(UserToDo,{
    foreignKey: 'todo_id'
})

UserToDo.belongsTo(ToDo,{
    foreignKey: 'todo_id'
})

QueueItem.hasMany(UserQueueItem,{
    foreignKey:"queue_item_id"
})

UserQueueItem.belongsTo(QueueItem,{
    foreignKey:'queue_item_id'
})

UserQueueItemDay.belongsTo(UserQueueItem,{
    foreignKey:'user_queue_item_id'
})

UserQueueItem.hasOne(UserQueueItemDay,{
    foreignKey:"user_queue_item_id"
})

QueueItem.hasMany(UserQueueItemDay,{
    foreignKey:"queue_item_id"
})

UserQueueItemDay.belongsTo(QueueItem,{
    foreignKey:"queue_item_id"
})

User.hasMany(UserToDo,{
    foreignKey:'user_id'
})

UserToDo.belongsTo(User,{
    foreignKey:"user_id"
})


Assessment.belongsToMany(User,{
    through:{
        model:UserAssessment,
        unique:false
    },
    as:"userAssessments"
});



module.exports = {User,Habit,ToDo,Assessment,AssessmentDay,UserHabit,UserAssessment,UserToDo,QueueItem,UserQueueItem,UserQueueItemDay}