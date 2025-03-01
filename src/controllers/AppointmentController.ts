import { Request, Response } from 'express';
import { Appointment, AppointmentModel } from '../models/Appointment';

export class AppointmentController {
    static async getAppointment(req: Request, res: Response) {
        try {
            const Patients = await AppointmentModel.findAll();
            res.json(Patients);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async getAppointmentById(req: Request, res: Response) {
        try {
            const patient = await AppointmentModel.findById(parseInt(req.params.id));
            if (!patient) return res.status(404).json({ message: 'Patient not found' });
            res.json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    static async createAppointment(req: Request, res: Response) {
        try {

            const newPatient = await AppointmentModel.create(req.body);
            res.status(201).json(newPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create patient';
            res.status(500).json({ message });
        }
    }

    static async updateAppointment(req: Request, res: Response) {
        try {
            const updatedPatient = await AppointmentModel.update(
                parseInt(req.params.id),
                req.body
            );

            res.json(updatedPatient);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update patient';
            res.status(404).json({ message });
        }
    }

    static async deleteAppointment(req: Request, res: Response) {
        try {
            const task = await AppointmentModel.findById(parseInt(req.params.id));
            if (!task) return res.status(404).json({ message: 'User not found' });

            await AppointmentModel.delete(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}