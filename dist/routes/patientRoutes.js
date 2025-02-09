"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PatientController_1 = require("../controllers/PatientController");
const router = (0, express_1.Router)();
router.get('/', PatientController_1.PatientController.getPatients);
router.get('/:id', PatientController_1.PatientController.getPatientById);
router.post('/', PatientController_1.PatientController.createPatient);
router.put('/:id', PatientController_1.PatientController.updatePatient);
router.delete('/:id', PatientController_1.PatientController.deletePatient);
exports.default = router;
