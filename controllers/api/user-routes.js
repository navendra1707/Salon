const router = require('express').Router();
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const Appointment = require('../../models/Appointment');
const { withAuth, isCustomer, isManager }  = require('../../utils/route-helpers');

router.get('/', withAuth, async (req, res) => {
    var whereFinder = {};
    if (req.query.phone) whereFinder.phone = req.query.phone;
    if (req.query.role) whereFinder.role = req.query.role;
    try {
        var userData = await User.findAll({
            where: whereFinder,
            include: {
                model: Appointment,
                include: [{
                    model: Booking,
                }]
            }
        });
        if (userData.length > 0) {
            var users = userData.map(user => user.get({plain: true}));
            res.status(200).json(users);
        } else res.status(400).json("Not Found");
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;