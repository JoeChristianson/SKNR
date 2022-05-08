const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js")

class UserQueueItemDay extends Model{}

UserQueueItemDay.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        user_queue_item_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'user_queue_item',
                key:'id'
            }
        },
        queue_item_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'queueitem',
                key:"id"
            }
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        isComplete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'user_queue_item_day'
    }
)

module.exports = UserQueueItemDay