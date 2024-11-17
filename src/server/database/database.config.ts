import { connect } from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'test';
const user = process.env.MONGO_USERNAME || '';
const pass = process.env.MONGO_PASSWORD || '';

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
