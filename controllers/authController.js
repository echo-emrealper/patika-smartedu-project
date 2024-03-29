const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    // console.log(errors);
    // console.log(errors.array()[0].msg);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `\nError ${i + 1}: ${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //user sessions
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', `Your password is incorrect!`);
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', `User doesn't exist!`);
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const users = await User.find({}).sort('role');
  const categories = await Category.find({}).sort('name');
  const courses = await Course.find({ user: req.session.userID }).sort({
    createdAt: -1,
  });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    await Course.deleteMany({ user: req.params.id });
    req.flash('success', `${user.name} has been removed successfully`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
