const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const isCustomer = (req, res, next) => {
  if (req.session.user_role !== "customer") {
    res.redirect('/');
  } else {
    next();
  }
};

const isManager = (req, res, next) => {
    next();
};
  
module.exports = { withAuth, isCustomer, isManager }
  