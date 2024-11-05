import { storage } from './storage.config';

const DAY = 24 * 60 * 60;
const RECEIPTS_BUCKET = 'receipts';

export const getReceiptUrlByName = (name: string, expires: number = DAY) =>
  storage.presignedGetObject(RECEIPTS_BUCKET, name, expires);

export const uploadReceipt = (name: string, file: Buffer) =>
  storage.putObject(RECEIPTS_BUCKET, name, file);

export const deleteReceipt = (name: string) => storage.removeObject(RECEIPTS_BUCKET, name);
