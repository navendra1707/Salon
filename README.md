# Polished Appointment Booking Application

## Description 
A handy tool for managers and technicians to keep track of upcoming appointments. Clients can book their appointment directly through the application by signing up through the login page, once in the Polished system clients can select their favorite technician, preferred appointment time (based on availability) through the built in calander. When the client has finished their appointment a SMS message will be sent from the application to send automated appointment reminders. 

  ## Table of Contents
  - [UserStory](#userstory)
  - [Installation](#installation)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## UserStory
```
AS A NAIL SALON OWNER 

I WANT a nail salon appointment-booking application

SO THAT my customers can easily view all of the services offered by my nail salon, create or sign into their account, book a new appointment with the nail technician of their choice and receive a text confirmation,  view all of their upcoming appointments, with the ability to edit or delete them. 
```
```
AS A NAIL SALON MANAGER

I WANT a nail salon appointment-booking application

SO THAT I can easily create or sign into an account, view all of my salon services, book new appointments, view my calendar for all upcoming customer appointments and see the customer's information, service, and their assigned nail tech as well as that nail tech's availability. 
```
## Installation
  ```
  git clone https://github.com/lflyew/Polished.git
  ```
  To install packages:
  ```
  npm i
  ```
  To create database and seed database: (setup enviroments .env)
  ```
  source schema.sql
  npm run seed
  ``` 
## Features 
```
* Landing Page shows all servies
* Authentication System handles user accounts: Login, Logout, Signup.
* Online Booking System for both customers and managers.
* Customer Page shows customer appointments
* Manager Page shows all customers appointments in Calendar.
* SMS Messaging helps as appointment reminders to customers.
* UI Responsive and Interactive with different screens (Smart Phone/Tablet/ Desktop) compatibility.
```
  
## Screenshots 
* Homepage with services:
![Homepage](./images/home-page.png)

* Login & Sign-up page:
![Login-Signup](./images/login-signup.png)

* Customer Appointment Bookings:
![Customer Appointment Bookings](./images/customer-appointment.png)

* Manager Appointments Management:
![Manager Appointments Management](./images/manager-appointment.png)

## Packages
``` 
  "bcrypt": "^5.0.0",
  "bootstrap": "^5.2.2",
  "connect-session-sequelize": "^7.0.4",
  "dotenv": "^8.2.0",
  "express": "^4.18.2",
  "express-handlebars": "^5.2.0",
  "express-session": "^1.17.1",
  "mysql2": "^2.2.5",
  "sequelize": "^6.3.5",
  "twilio": "^3.82.2",
  "fullcalendar": "^5.11.3"
```

## Contributing
Follow the repo link below and submit a pull request. 
Contributions to the development of this application are welcome. 
[Polised-Booking-App](https://github.com/lflyew/Polished) 

## Tests 
Twilio-sending trial messages to verified phone numbers 
Debugged codes manually to make sure application was functional 

## Questions
If you have any questions about the repo, open an issue or contact us directly at odthientho@gmail.com. 

You can find more our projects at [odthientho](https://github.com/odthientho/), 
[ndubuisiazi](https://github.com/ndubuisiazi), 
[oliviaconley](https://github.com/oliviaconley),
[lflyew](https://github.com/lflyew), 
[rgonsahn](https://github.com/rgonsahn)

