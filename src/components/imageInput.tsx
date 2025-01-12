'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import Image from 'next/image';
import { useTotalReceiptCost } from '@/hooks/useTotalReceiptCost';

interface ImageInputProps {
  clearTrigger?: boolean;
}

export default function ImageInput({ clearTrigger }: Readonly<ImageInputProps>) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loading, setTotalCost, sendImageForAnalysis } = useTotalReceiptCost();

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        sendImageForAnalysis(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [sendImageForAnalysis]
  );

  const clearImagePreview = useCallback(() => {
    setImagePreview(null);
    setTotalCost(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setTotalCost]);

  useEffect(() => {
    clearImagePreview();
  }, [clearTrigger, clearImagePreview]);

  const onAddImageClick = useCallback(() => fileInputRef.current?.click(), []);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="image" className="text-sm font-medium">
        Choose an image:
      </label>
      {imagePreview ? (
        <div className="relative flex justify-center">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-60 flex flex-col items-center justify-center">
              <span className="loading loading-spinner loading-xl mb-2 black" />
              <span className="text-black font-bold">Extracting total cost from receipt...</span>
            </div>
          )}
          <Image
            src={imagePreview}
            width={250}
            height={250}
            alt="Selected"
            className="w-9/12 h-auto"
          />
          {!loading && (
            <button
              type="button"
              onClick={clearImagePreview}
              className="absolute top-0 right-0 rounded-full w-6 h-6"
              aria-label="Remove Selected Image"
            >
              <MdOutlineCancel />
            </button>
          )}
        </div>
      ) : (
        <button
          className="flex justify-center items-center px-4 h-12 border input-bordered"
          type="button"
          onClick={onAddImageClick}
          aria-label="Add Image"
        >
          <FaCamera />
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
