import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import departmentRoutes from './routes/departmentRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';


dotenv.config();

const app = express();

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/user/login', userRoutes);
app.use('/api/user/role', userRoutes);
app.use('/api/user/resetpassword', userRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/patient/pno', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/doctor/dno', doctorRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/appointment', appointmentRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;