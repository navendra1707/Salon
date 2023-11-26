const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Booking extends Model {}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        appointment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'appointment',
                key: 'id',
              },
        }, 
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'service',
                key: 'id',
              },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'user', 
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'booking',
    }
); 

module.exports = Booking; 