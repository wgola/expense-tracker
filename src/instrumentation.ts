import { connectToDatabase } from './server/database/database.config';

export async function register() {
  await connectToDatabase();
}
