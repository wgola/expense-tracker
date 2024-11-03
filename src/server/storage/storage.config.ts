import { Client, ClientOptions } from 'minio';
import { env } from 'process';

const endPoint = env.MINIO_ENDPOINT || 'localhost';
const port = parseInt(env.MINIO_PORT || '9000');
const useSSL = env.MINIO_USE_SSL === 'true';
const accessKey = env.MINIO_ACCESS_KEY || '';
const secretKey = env.MINIO_SECRET_KEY || '';

const storageConfig: ClientOptions = {
  endPoint,
  port,
  useSSL,
  accessKey,
  secretKey
};

export const storage = new Client(storageConfig);
