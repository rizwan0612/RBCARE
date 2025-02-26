import { Request, Response } from 'express';
import { Doctor, DoctorModel } from '../models/Doctor';

export class DoctorController {
    static async getDoctors(req: Request, res: Response) {
        try {
            const Patients = await DoctorModel.findAll();
            res.json(Patients);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async getDoctorById(req: Request, res: Response) {
        try {
            const patient = await DoctorModel.findById(parseInt(req.params.id));
            if (!patient) return res.status(404).json({ message: 'Patient not found' });
            res.json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async createDoctor(req: Request, res: Response) {
        try {

            const newPatient = await DoctorModel.create(req.body);
            res.status(201).json(newPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create patient';
            res.status(500).json({ message });
        }
    }

    static async updateDoctor(req: Request, res: Response) {
        try {
            const updatedPatient = await DoctorModel.update(
                parseInt(req.params.id),
                req.body
            );

            res.json(updatedPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update patient';
            res.status(404).json({ message });
        }
    }

    static async deleteDoctor(req: Request, res: Response) {
        try {
            const task = await DoctorModel.findById(parseInt(req.params.id));
            if (!task) return res.status(404).json({ message: 'User not found' });

            await DoctorModel.delete(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async getByDoctorLicenceNo(req: Request, res: Response) {
        try {
            const patient = await DoctorModel.findByDoctorNo(req.body);
            if (!patient) return res.status(404).json({ message: 'Patient not found' });
            res.json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}