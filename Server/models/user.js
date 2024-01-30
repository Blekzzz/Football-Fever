'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Username has been used by another user, please use another username" },
      validate: {
        notEmpty: { msg: "Username cannot be empty" },
        notNull: { msg: "Username cannot be null" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
        notNull: { msg: "Password cannot be null" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email has been used by another user, please use another email" },
      validate: {
        notEmpty: { msg: "Email cannot be empty" },
        notNull: { msg: "Email cannot be null" }
      }
    },
    isMembership: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    about: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instances, options) => {
        instances.password = hashPassword(instances.password)
      }
    }
  });
  return User;
};