const {Model, DataTypes}=require("sequelize");
const sequelize = require("../config/connection.js");

class AssessmentDay extends Model{};

AssessmentDay.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        assessment_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user_assessment',
                key:'id'
            }
        },
        value:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }       
    },
    {
        sequelize,
        timestamps:true,
        freezeTableName:true,
        underscored:true,
        modelName:'assessment_day'
    }
)

module.exports = AssessmentDay;