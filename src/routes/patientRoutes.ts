import { Router } from 'express';
import { PatientController } from '../controllers/PatientController';

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
router.get('/', PatientController.getPatients);

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
router.get('/:id', PatientController.getPatientById);

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
router.post('/', PatientController.createPatient);

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
router.put('/:id', PatientController.updatePatient);

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
router.delete('/:id', PatientController.deletePatient);

/**
 * @swagger
 * /api/patient/pno:
 *   post:
 *     summary: Get a patient by patient_number
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patient_number
 *         schema:
 *           type: string
 *         required: true
 *         description: patient_number of the patient to retrieve
 *     responses:
 *       200:
 *         description: patient found
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "John Doe"
 *               email: "john@example.com"
 *               age: 30
 *       404:
 *         description: patient not found
 *         content:
 *           application/json:
 *             example:
 *               error: "patient not found"
 *       500:
 *         description: Server error
 */
router.post('/pno', PatientController.getByPatientNo);

export default router;