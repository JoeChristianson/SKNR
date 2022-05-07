const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

class UserToDo extends Model {};

UserToDo.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        to_do_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'todo',
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

module.exports = UserToDo;