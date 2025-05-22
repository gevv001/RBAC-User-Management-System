import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import mongoose from 'mongoose';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import photosRoutes from './routes/photosRoutes.js';
import { seedAdmin } from './initAdmin.mjs';
configDotenv();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/photos', photosRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

connectDB();
mongoose.connection.once('open', async () => {
    console.log('DB connected');
    await seedAdmin();

    app.listen(PORT, () => {
        console.log('Server running on port: ', PORT);
    })
})

