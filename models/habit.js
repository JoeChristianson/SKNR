const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Habit extends Model {}

Habit.init(
    {
      id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      habit_name:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      is_active:{
          type:DataTypes.BOOLEAN,
      },
      positive:{
        type:DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'habit',
    }
  );

  module.exports = Habit;