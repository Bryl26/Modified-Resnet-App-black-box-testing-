export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  imageUrl: string;
}

export type DetectionResult = {
  isRiceLeaf: boolean;
  confidence: number;
  disease?: Disease;
  processingTime?: number;
};