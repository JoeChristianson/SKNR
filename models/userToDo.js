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
        todo_id:{
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
        },
        isComplete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        }   
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'user_to_do'
    }
)

module.exports = UserToDo;