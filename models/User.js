const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
 
class User extends Model {
    //compare the hashed pw stored in the database with the original pw created by the user
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
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            //hashing the user pw before inserting it into the database
            beforeCreate: async (newUserData) => {
                if (!(newUserData.role === "customer" || 
                        newUserData.role === "manager" || 
                        newUserData.role === "technician")) {
                    throw Error("Role is not defined.")
                }
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
module.exports = User;