const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMİddleware');

const router = express.Router();

router
  .route('/')
  .post(roleMiddleware(['Teacher', 'Admin']), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
