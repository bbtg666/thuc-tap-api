var jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = require('../models/user.model.js')

module.exports.createUser = function (req, res, next) {
  const newUser = new User({
    email: req.body.email,
    phone: req.body.phone,
    name: req.body.name,
    hash_password: bcrypt.hashSync(req.body.password, 10)
  });
  newUser.save((err) => {
    if (err) {
      return res.json({
        result: "failed",
        data: {},
        messege: `Lỗi: ${err}`
      });
    }
    else {
      newUser.hash_password = undefined;
      return res.json({
        result: "ok",
        data: newUser
      })
    }
  })
};


exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.json({ message: 'failed' });
    }
    return res.status(200).json({
      token: jwt.sign({
        email: user.email,
        fullName: user.fullName,
        _id: user._id,
        name: user.name
      }, 'giang')
    });
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
module.exports.isLogin = function (req, res, next) {
  return res.json({
    result: "ok",
    data: req.user
  })
};