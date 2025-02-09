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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class PatientModel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM patients');
            return rows;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM patients WHERE patient_id = ?', [id]);
            return rows[0] || null;
        });
    }
    static create(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.query('INSERT INTO patients (first_name, last_name, date_of_birth,gender,phone_number, address, email_address, emergency_contact_name, emergency_contact_number, created_at,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)', [patient.first_name, patient.last_name, patient.date_of_birth, patient.gender, patient.address, patient.email_address, patient.phone_number, patient.emergency_contact_name, patient.emergency_contact_number, patient.created_at, patient.updated_at]);
            // Handle potential null with type assertion
            const createdPatient = yield this.findById(result.insertId);
            if (!createdPatient) {
                throw new Error('Failed to create task');
            }
            return createdPatient;
        });
    }
    static update(id, patient) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE patients SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, address = ?, email_address=?, phone_number=?, emergency_contact_name=?, emergency_contact_number=?, updated_at=?  WHERE patient_id = ?', [patient.first_name, patient.last_name, patient.date_of_birth, patient.gender, patient.address, patient.email_address, patient.phone_number, patient.emergency_contact_name, patient.emergency_contact_number, patient.updated_at, patient.patient_id]);
            const updatedUser = yield this.findById(id);
            if (!updatedUser) {
                throw new Error('User not found after update');
            }
            return updatedUser;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM patients WHERE patient_id = ?', [id]);
        });
    }
}
exports.PatientModel = PatientModel;
