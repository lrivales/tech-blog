const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    // add class methods here
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
    sequelize, // pass the connection instance
    timestamps: false, // this will not auto-create createdAt and updatedAt columns
    freezeTableName: true, // this enforces the table name to be equal to the model name
    underscored: true, // this will use underscore in the column names instead of camel case
    modelName: 'user' // model name is required
    }
);

module.exports = User;