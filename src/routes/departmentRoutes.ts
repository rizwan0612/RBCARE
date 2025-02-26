import { Router } from 'express';
import { DepartmentController } from '../controllers/DepartmentController';

const router = Router();

/**
 * @swagger
 * /api/Patient:
 *   get:
 *     summary: Get all Patient
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Successfully retrieved Patient
 *         content:
 *           application/json:
 *             example:
 *               Patient: [{ id: 1, name: "John" }]
 */
router.get('/', DepartmentController.getDepartments);

/**
 * @swagger
 * /api/Patient/{id}:
 *   get:
 *     summary: Get Patient By Id
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Successfully retrieved Patient
 *         content:
 *           application/json:
 *             example:
 *               Patient: [{ id: 1, name: "John" }]
 */
router.get('/:id', DepartmentController.getDepartmentById);

/**
 * @swagger
 * /api/Patient:
 *   post:
 *     summary: Create Patient
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Successfully created Patient
 *         content:
 *           application/json:
 *             example:
 *               Patient: [{ id: 1, name: "John" }]
 */
router.post('/', DepartmentController.createDepartment);

/**
 * @swagger
 * /api/Patient:
 *   put:
 *     summary: Update User
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Successfully retrieved Patient
 *         content:
 *           application/json:
 *             example:
 *               Patient: [{ id: 1, name: "John" }]
 */
router.put('/:id', DepartmentController.updateDepartment);

/**
 * @swagger
 * /api/Patient:
 *   delete:
 *     summary: Delete Patient
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Successfully created Patient
 *         content:
 *           application/json:
 *             example:
 *               Patient: [{ id: 1, name: "John" }]
 */
router.delete('/:id', DepartmentController.deleteDepartment);


export default router;