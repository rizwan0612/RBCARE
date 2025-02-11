"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             example:
 *               user: [{ id: 1, name: "John" }]
 */
router.get('/', UserController_1.UserController.getUsers);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "John Doe"
 *               email: "john@example.com"
 *               age: 30
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Server error
 */
router.get('/:id', UserController_1.UserController.getUserById);
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "John Doe"
 *               email: "john@example.com"
 *               age: 30
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: "Email is required"
 *       500:
 *         description: Server error
 */
router.post('/', UserController_1.UserController.createUser);
/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "updated@example.com"
 *               age:
 *                 type: integer
 *                 example: 35
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email format"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Server error
 */
router.put('/:id', UserController_1.UserController.updateUser);
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully"
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid user ID"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Server error
 */
router.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = router;
