import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: 'db-desasigap',
    });
    return Promise.resolve('Database Connected!');
  } catch (error) {
    return Promise.reject(error);
  }
};

export default db;
