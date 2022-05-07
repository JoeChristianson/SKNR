const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

class UserAssessment extends Model {};

UserAssessment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        assessment_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'assessment',
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
        modelName:'user_assessment'
    }
)

module.exports = UserAssessment;