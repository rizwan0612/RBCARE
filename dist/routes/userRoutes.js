"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             example:
 *               users: [{ id: 1, name: "John" }]
 */
router.get('/', UserController_1.UserController.getUsers);
router.get('/:id', UserController_1.UserController.getUserById);
router.post('/', UserController_1.UserController.createUser);
router.put('/:id', UserController_1.UserController.updateUser);
router.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = router;
