import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { DetectionResult, Disease } from '../types';

interface DetectionResultsProps {
  result: DetectionResult | null;
  isProcessing: boolean;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ result, isProcessing }) => {
  if (isProcessing) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900">Processing Image</h3>
            <p className="text-gray-500 text-sm mt-2">
              Analyzing the image for rice leaf detection and disease classification...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className={`p-4 ${result.isRiceLeaf ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center">
            {result.isRiceLeaf ? (
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            )}
            <h3 className="text-lg font-medium">
              {result.isRiceLeaf ? 'Rice Leaf Detected' : 'Not a Rice Leaf'}
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {result.isRiceLeaf
              ? `Confidence: ${(result.confidence * 100).toFixed(2)}%`
              : 'Please upload an image of a rice leaf for disease detection.'}
          </p>
        </div>

        {result.isRiceLeaf && result.disease && (
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={result.disease.imageUrl}
                  alt={result.disease.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{result.disease.name}</h4>
                <p className="text-sm text-gray-500 italic">{result.disease.scientificName}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-700">{result.disease.description}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="flex items-center text-md font-medium text-gray-900 mb-2">
                  <Info className="h-4 w-4 mr-1 text-blue-500" />
                  Symptoms
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {result.disease.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="flex items-center text-md font-medium text-gray-900 mb-2">
                  <Info className="h-4 w-4 mr-1 text-green-500" />
                  Treatment
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {result.disease.treatment.map((treatment, index) => (
                    <li key={index}>{treatment}</li>
                  ))}
                </ul>
              </div>
            </div>

            {result.processingTime && (
              <div className="mt-6 text-xs text-gray-500 text-right">
                Processing time: {result.processingTime.toFixed(2)}ms
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionResults;