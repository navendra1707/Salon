const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const router = require('express').Router();
const { withAuth, isCustomer, isManager }  = require('../utils/route-helpers');

router.get('/', async (req, res) => {
    try {
        const servData = await Service.findAll();
        var services = servData.map((serv) => serv.get({ plain: true}));
        if (!services) res.status(404).json({"messange": "there is no services"});
        else {
            res.render('home', {
                services: services,
                user_id: req.session.user_id,
                user_role: req.session.user_role,
                logged_in: req.session.logged_in,
            });
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        user_id: req.session.user_id,
        user_role: req.session.user_role,
        logged_in: req.session.logged_in,
    });
});

router.get('/appointment', withAuth, isCustomer, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id,
            },
            include: {
                model: Appointment,
            }
        });
        if (!userData) res.status(404).json({"messange": "there is no users"});
        else {
            var user = userData.get({ plain: true});
            var today = new Date().toJSON().slice(0,10);
            user.appointments = user.appointments.filter(appt => appt.date > today);
            user.appointments.sort((userA, userB) => {
                if (userA.date < userB.date) return -1; 
                else if (userA.date == userB.date && userA.time_slot < userB.time_slot) return -1;
            });
            res.render('appointment', {
                user: user,
                user_id: req.session.user_id,
                user_role: req.session.user_role,
                logged_in: req.session.logged_in,
            });
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

router.get('/manager', withAuth, isManager, (req, res) => {
    res.render('manager', {
        user_id: req.session.user_id,
        user_role: req.session.user_role,
        logged_in: req.session.logged_in,
    });
    
})

module.exports = router;