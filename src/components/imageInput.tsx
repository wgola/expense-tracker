'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import Image from 'next/image';

export default function ImageInput() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const onAddImageClick = useCallback(() => fileInputRef.current?.click(), []);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="image" className="text-sm font-medium">
        Choose an image:
      </label>
      {imagePreview ? (
        <div className="relative flex justify-center">
          <Image src={imagePreview} width={250} height={250} alt="Selected" />
          <button
            type="button"
            onClick={clearImagePreview}
            className="absolute top-0 right-0 rounded-full w-6 h-6"
          >
            <MdOutlineCancel />
          </button>
        </div>
      ) : (
        <button
          className="flex justify-center items-center px-4 h-12 border input-bordered"
          type="button"
          onClick={onAddImageClick}
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
        required
        className="hidden"
      />
    </div>
  );
}
