"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const Patient_1 = require("../models/Patient");
class PatientController {
    static getPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Patients = yield Patient_1.PatientModel.findAll();
                res.json(Patients);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static getPatientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield Patient_1.PatientModel.findById(parseInt(req.params.id));
                if (!patient)
                    return res.status(404).json({ message: 'Patient not found' });
                res.json(patient);
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    static createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, date_of_birth, gender, phone_number, address, email_address, emergency_contact_name, emergency_contact_number, created_at, updated_at } = req.body;
                if (!first_name || !email_address) {
                    return res.status(400).json({ message: 'first name and email are required' });
                }
                const newPatient = yield Patient_1.PatientModel.create({
                    first_name, last_name, date_of_birth, gender, phone_number, address, email_address, emergency_contact_name, emergency_contact_number, created_at, updated_at
                });
                res.status(201).json(newPatient);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create patient';
                res.status(500).json({ message });
            }
        });
    }
    static updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPatient = yield Patient_1.PatientModel.update(parseInt(req.params.id), req.body);
                res.json(updatedPatient);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update patient';
                res.status(404).json({ message });
            }
        });
    }
    static deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Patient_1.PatientModel.findById(parseInt(req.params.id));
                if (!task)
                    return res.status(404).json({ message: 'User not found' });
                yield Patient_1.PatientModel.delete(parseInt(req.params.id));
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.PatientController = PatientController;
