import { DetectionResult, Disease } from '../types';
import { diseases } from '../data/diseases';

// Simulates the detection process with a delay
export const detectRiceLeafDisease = async (imageFile: File): Promise<DetectionResult> => {
  // Simulate processing time
  const startTime = performance.now();
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // First stage: Detect if it's a rice leaf
  const isRiceLeaf = simulateRiceLeafDetection(imageFile);
  
  if (!isRiceLeaf) {
    return {
      isRiceLeaf: false,
      confidence: 0.92,
      processingTime: performance.now() - startTime
    };
  }
  
  // Second stage: Classify the disease
  const disease = simulateDiseaseClassification();
  
  return {
    isRiceLeaf: true,
    confidence: 0.95,
    disease,
    processingTime: performance.now() - startTime
  };
};

// Mock function to simulate rice leaf detection
// In a real implementation, this would use a trained model
const simulateRiceLeafDetection = (imageFile: File): boolean => {
  // For demo purposes, we'll use the file name to determine if it's a rice leaf
  // In a real implementation, this would use image analysis
  const fileName = imageFile.name.toLowerCase();
  
  // Simulate non-rice leaf detection for files with specific names
  if (fileName.includes('not-rice') || fileName.includes('test-negative')) {
    return false;
  }
  
  // For demo purposes, randomly return false 10% of the time
  return Math.random() > 0.1;
};

// Mock function to simulate disease classification
// In a real implementation, this would use a trained model
const simulateDiseaseClassification = (): Disease => {
  // For demo purposes, randomly select a disease from our list
  const randomIndex = Math.floor(Math.random() * diseases.length);
  return diseases[randomIndex];
};