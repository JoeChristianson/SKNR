const {Habit} = require("../models")

const habitData = [
    {
        habit_name:"Set alarm inside of room."
    },
]

const seedHabits = ()=> Habit.bulkBuild(habitData)

module.exports = seedHabits