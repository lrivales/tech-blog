const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10; //used by bcrypt to hash the password

async function hashPassword(password) {
    console.log(password);
    console.log(saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

class User extends Model {
    // add class methods here
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
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

User.beforeCreate(async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    console.log(user);
});

// why is this not working?
User.beforeUpdate(async (user) => {
    console.log(user)
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    console.log(user);
});

module.exports = User;