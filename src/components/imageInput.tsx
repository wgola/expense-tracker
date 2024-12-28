import { ChangeEvent, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';

export function ImageInput() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="image" className="text-sm font-medium">
        Choose an image:
      </label>
      {imagePreview ? (
        <div
          className="relative flex justify-center cursor-pointer"
          onClick={() => document.getElementById('image')?.click()}
        >
          <img src={imagePreview} width={125} height={125} alt="Selected" />
          <button
            type="button"
            onClick={clearImagePreview}
            className="absolute top-0 right-0 rounded-full w-6 h-6"
          >
            <MdOutlineCancel />
          </button>
        </div>
      ) : (
        <div
          className="flex justify-center items-center px-4 h-12 border cursor-pointer"
          onClick={() => document.getElementById('image')?.click()}
        >
          <FaCamera />
        </div>
      )}
      <input
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
