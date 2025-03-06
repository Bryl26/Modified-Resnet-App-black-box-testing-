import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera } from 'lucide-react';
import Webcam from 'react-webcam';

interface ImageUploaderProps {
  onImageSelected: (imageFile: File | null, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageSelected(file, imageUrl);
      setIsCapturing(false);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        
        // Convert base64 to blob
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
            onImageSelected(file, imageSrc);
          });
      }
    }
    setIsCapturing(false);
  }, [webcamRef, onImageSelected]);

  const toggleCapture = () => {
    setIsCapturing(!isCapturing);
    if (!isCapturing) {
      setImage(null);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!isCapturing ? (
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
              isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="text-center text-gray-500">
                {isDragActive
                  ? 'Drop the rice leaf image here...'
                  : 'Drag & drop a rice leaf image here, or click to select'}
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: JPEG, PNG, WebP
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={toggleCapture}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Camera size={18} />
              <span>Use Camera</span>
            </button>
          </div>

          {image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Image:</p>
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt="Selected rice leaf"
                  className="w-full h-auto object-contain max-h-[300px]"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    onImageSelected(null, '');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-gray-300">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "environment"
              }}
              className="w-full h-auto"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={captureImage}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Capture Photo
            </button>
            <button
              onClick={toggleCapture}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;