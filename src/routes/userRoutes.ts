import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

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
router.get('/', UserController.getUsers);

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
router.get('/:id', UserController.getUserById);

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
router.post('/', UserController.createUser);

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
router.put('/:id', UserController.updateUser);

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
router.delete('/:id', UserController.deleteUser);

export default router;