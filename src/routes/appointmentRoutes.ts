import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';

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
router.get('/', AppointmentController.getAppointment);

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
router.get('/:id', AppointmentController.getAppointmentById);

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
router.post('/', AppointmentController.createAppointment);

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
router.put('/:id', AppointmentController.updateAppointment);

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
router.delete('/:id', AppointmentController.deleteAppointment);


export default router;