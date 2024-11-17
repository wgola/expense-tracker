import { Client, ClientOptions } from 'minio';

const endPoint = process.env.MINIO_ENDPOINT || 'localhost';
const port = parseInt(process.env.MINIO_PORT || '9000');
const useSSL = process.env.MINIO_USE_SSL === 'true';
const accessKey = process.env.MINIO_ACCESS_KEY || '';
const secretKey = process.env.MINIO_SECRET_KEY || '';

const storageConfig: ClientOptions = {
  endPoint,
  port,
  useSSL,
  accessKey,
  secretKey
};

export const storage = new Client(storageConfig);
