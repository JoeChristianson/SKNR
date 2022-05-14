const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");
const User = require("./user.js");

class UserHabitDay extends Model{}

UserHabitDay.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        user_habit_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'user_habit',
                key:'id'
            }
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        isOn:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        isComplete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        isConfirmed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'user_habit_day'
    }
)

module.exports = UserHabitDay