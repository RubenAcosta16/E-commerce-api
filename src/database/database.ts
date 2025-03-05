import mongoose from 'mongoose';
import {MONGODB_URI} from '../config';


const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI as string, {
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Salir del proceso en caso de error
    }
};

export default connectDB;
