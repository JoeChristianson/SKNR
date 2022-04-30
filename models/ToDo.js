const {Model,DataTypes}=require('sequelize');
const sequelize = require("../config/connection.js");

class ToDo extends Model {

}

ToDo.init(
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
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        },
        isComplete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName:true,
        underscored:true,
        modelName:'todo'
    }
)

module.exports = ToDo;