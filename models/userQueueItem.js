const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

class UserQueueItem extends Model {}

UserQueueItem.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        queue_item_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'queueitem',
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
        ordinal:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'user_queue_item'
    }
)

module.exports = UserQueueItem;