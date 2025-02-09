"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /user:
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
 * /user:
 *   get:
 *     summary: Get use by id
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             example:
 *               user: [{ id: 1, name: "John" }]
 */
router.get('/:id', UserController_1.UserController.getUserById);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             example:
 *               user: [{ id: 1, name: "John" }]
 */
router.post('/', UserController_1.UserController.createUser);
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             example:
 *               user: [{ id: 1, name: "John" }]
 */
router.put('/:id', UserController_1.UserController.updateUser);
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             example:
 *               user: [{ id: 1, name: "John" }]
 */
router.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = router;
