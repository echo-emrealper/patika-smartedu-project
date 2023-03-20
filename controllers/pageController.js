const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find({}).sort({ createdAt: -1 }).limit(2);
  const totalCourses = await Course.find({}).countDocuments();
  const totalStudents = await User.find({}).countDocuments({ role: 'Student' });
  const totalTeachers = await User.find({}).countDocuments({ role: 'Teacher' });

  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Message Detailes</h1>
  <ul>
    <li>Name:${req.body.name}</li> 
    <li>Email:${req.body.email}</li> 
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}<p>
  `;

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'berenice51@ethereal.email', // generated ethereal user
        pass: 'YfwqkpvcsGKaFVGk2j', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"SmartEDU Contact Team" <berenice51@ethereal.email>', // sender address
      to: 'berenice51@ethereal.email', // list of receivers
      subject: 'SmartEDU Contact Team', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We recived your message successfully');

    res.status(200).redirect('/contact');
  } catch (err) {
    // req.flash('error', `Something happaned! ${err}`);
    req.flash('error', `Something happaned!`);
    res.status(200).redirect('/contact');
  }
};
