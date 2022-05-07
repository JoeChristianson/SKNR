const {Model,DataTypes}=require('sequelize');
const sequelize = require("../config/connection.js");

class QueueItem extends Model {

}

QueueItem.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName:true,
        underscored:true,
        modelName:'queueitem'
    }
)

module.exports = QueueItem;