const router = require('express').Router();
const { User } = require('../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { phone: req.body.phone } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'No emails found, please try again' });
            return;
        }
        const validPassword = true;
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        } else
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_role = userData.role;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            password: req.body.password,
            role: req.body.role,
          });
        if (userData) {
            res.status(200).json({ user: userData, message: 'New account just created.' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;