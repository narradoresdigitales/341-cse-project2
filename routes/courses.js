const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

/**
 * @swagger
 * /courses:
 *   get:
 *     description: Get all courses
 *     responses:
 *       200:
 *         description: Returns a list of courses.
 */
router.get('/', coursesController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     description: Get course by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Returns the course
 *       404:
 *         description: Course not found
 */
router.get('/:id', coursesController.getCourse);

/**
 * @swagger
 * /courses:
 *   post:
 *     description: Create a new course
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: course
 *         description: The course to create
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - courseName
 *             - instructor
 *             - credits
 *             - isAvailable
 *           properties:
 *             courseName:
 *               type: string
 *               example: "Intro to Programming"
 *             instructor:
 *               type: string
 *               example: "Jane Doe"
 *             credits:
 *               type: integer
 *               example: 3
 *             isAvailable:
 *               type: boolean
 *               example: true
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Error creating course
 */
router.post('/', coursesController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     description: Update an existing course by ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The course ID
 *       - in: body
 *         name: course
 *         description: The course data to update
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - courseName
 *             - instructor
 *             - credits
 *             - isAvailable
 *           properties:
 *             courseName:
 *               type: string
 *               example: "Advanced Math"
 *             instructor:
 *               type: string
 *               example: "John Smith"
 *             credits:
 *               type: integer
 *               example: 4
 *             isAvailable:
 *               type: boolean
 *               example: false
 *     responses:
 *       204:
 *         description: No Content (successful update)
 *       404:
 *         description: Course not found
 */
router.put('/:id', coursesController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     description: Delete a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The course ID
 *     responses:
 *       204:
 *         description: No Content (successful deletion)
 *       404:
 *         description: Course not found
 */
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
