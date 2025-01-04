'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import Image from 'next/image';

interface ImageInputProps {
  clearTrigger?: boolean; // New prop to trigger clearing
}

export default function ImageInput({ clearTrigger }: ImageInputProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      fetch('http://localhost:5000/api/analyze-receipt', { method: 'POST', body: formData })
        .then((res) => res.json())
        .then((data) => console.log(data));

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImagePreview = useCallback(() => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  useEffect(() => {
    clearImagePreview();
  }, [clearTrigger]);

  const onAddImageClick = useCallback(() => fileInputRef.current?.click(), []);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="image" className="text-sm font-medium">
        Choose an image:
      </label>
      {imagePreview ? (
        <div className="relative flex justify-center">
          <Image
            src={imagePreview}
            width={250}
            height={250}
            alt="Selected"
            className="w-9/12 h-auto"
          />
          <button
            type="button"
            onClick={clearImagePreview}
            className="absolute top-0 right-0 rounded-full w-6 h-6"
            aria-label="Remove Selected Image"
          >
            <MdOutlineCancel />
          </button>
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
