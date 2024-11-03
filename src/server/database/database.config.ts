import { connect } from 'mongoose';
import { env } from 'process';

const uri = env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = env.MONGO_DB || 'test';
const user = env.MONGO_USERNAME || '';
const pass = env.MONGO_PASSWORD || '';

export const connectToDatabase = async () => {
  try {
    await connect(uri, {
      dbName,
      user,
      pass
    });
    console.log(`Connected to MongoDB database '${dbName}'`);
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
};
