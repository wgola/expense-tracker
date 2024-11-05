import { describe, it, expect, vi } from 'vitest';
import {
  getReceiptUrlByName,
  uploadReceipt,
  deleteReceipt
} from '../../../src/server/storage/storage.functions';
import { storage } from '../../../src/server/storage/storage.config';

vi.mock('../../../src/server/storage/storage.config', () => ({
  storage: {
    presignedGetObject: vi.fn(),
    putObject: vi.fn(),
    removeObject: vi.fn()
  }
}));

describe('Storage Functions', () => {
  const RECEIPTS_BUCKET = 'receipts';
  const DAY = 24 * 60 * 60;

  describe('getReceiptUrlByName', () => {
    it('should call storage.presignedGetObject with correct parameters', () => {
      const name = 'test-receipt';
      const expires = DAY;

      getReceiptUrlByName(name);

      expect(storage.presignedGetObject).toHaveBeenCalledWith(RECEIPTS_BUCKET, name, expires);
    });

    it('should call storage.presignedGetObject with custom expiration', () => {
      const name = 'test-receipt';
      const expires = 2 * DAY;

      getReceiptUrlByName(name, expires);

      expect(storage.presignedGetObject).toHaveBeenCalledWith(RECEIPTS_BUCKET, name, expires);
    });
  });

  describe('uploadReceipt', () => {
    it('should call storage.putObject with correct parameters', () => {
      const name = 'test-receipt';
      const file = Buffer.from('test file content');

      uploadReceipt(name, file);

      expect(storage.putObject).toHaveBeenCalledWith(RECEIPTS_BUCKET, name, file);
    });
  });

  describe('deleteReceipt', () => {
    it('should call storage.removeObject with correct parameters', () => {
      const name = 'test-receipt';

      deleteReceipt(name);

      expect(storage.removeObject).toHaveBeenCalledWith(RECEIPTS_BUCKET, name);
    });
  });
});
