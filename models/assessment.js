const {Model, DataTypes}=require('sequelize');
const sequelize = require("../config/connection.js")

class Assessment extends Model{}

Assessment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        assessment_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        metric:{
            type:DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'assessment'
    }
)

module.exports = Assessment;