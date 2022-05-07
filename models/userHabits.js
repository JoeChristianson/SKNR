const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");
const User = require("./user");

class UserHabit extends Model {}

UserHabit.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        habit_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'habit',
                key:'id'
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:"id"
            }
        }   
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'user_habit'
    }
)

module.exports = UserHabit;