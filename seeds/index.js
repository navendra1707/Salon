const { 
  User, 
  Service, 
  Appointment, 
  Booking } = require('../models/');
const userData = require('./user_data.json');
const serviceData = require('./service_data.json');
const appointmentData = require('./appointment_data.json');
const bookingData = require('./booking_data.json');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // start to seeding database
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Service.bulkCreate(serviceData);
  await Appointment.bulkCreate(appointmentData);
  await Booking.bulkCreate(bookingData);
  
  process.exit(0);
};

seedAll();