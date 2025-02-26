import { Request, Response } from 'express';
import { Department, DepartmentModel } from '../models/Department';

export class DepartmentController {
    static async getDepartments(req: Request, res: Response) {
        try {
            const Patients = await DepartmentModel.findAll();
            res.json(Patients);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async getDepartmentById(req: Request, res: Response) {
        try {
            const patient = await DepartmentModel.findById(parseInt(req.params.id));
            if (!patient) return res.status(404).json({ message: 'Patient not found' });
            res.json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async createDepartment(req: Request, res: Response) {
        try {

            const newPatient = await DepartmentModel.create(req.body);
            res.status(201).json(newPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create patient';
            res.status(500).json({ message });
        }
    }

    static async updateDepartment(req: Request, res: Response) {
        try {
            const updatedPatient = await DepartmentModel.update(
                parseInt(req.params.id),
                req.body
            );

            res.json(updatedPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update patient';
            res.status(404).json({ message });
        }
    }

    static async deleteDepartment(req: Request, res: Response) {
        try {
            const task = await DepartmentModel.findById(parseInt(req.params.id));
            if (!task) return res.status(404).json({ message: 'User not found' });

            await DepartmentModel.delete(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}