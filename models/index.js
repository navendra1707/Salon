const User = require('./User'); 
const Service = require('./Service'); 
const Appointment = require('./Appointment'); 
const Booking = require('./Booking'); 

// Customer hasMany (book) many appointments
User.hasMany(Appointment, {
    foreignKey: 'user_id',
});
//One appointment belongsTo One customer 
Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Appointment.hasMany(Booking, {
    foreignKey: "appointment_id",
});
Booking.belongsTo(Appointment, {
    foreignKey: "appointment_id",
    onDelete: "CASCADE"
})

module.exports = { 
    User, 
    Service, 
    Appointment, 
    Booking
}; 

