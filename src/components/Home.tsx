import React from 'react';
import { useTranslation } from 'react-i18next';
import { Microscope, Brain, Database, Award } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Advanced Rice Disease Detection System</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4 leading-relaxed">
              Rice diseases pose a significant threat to global food security, particularly in rice-dependent countries like the Philippines. Traditional disease detection methods rely on manual inspection, which is time-consuming, labor-intensive, and prone to errors. This study presents an advanced approach to detecting multiple rice diseases using a modified ResNet50 convolutional neural network (CNN). Unlike previous models that classified fewer than ten diseases, this research enhances ResNet50 to classify 14 distinct rice diseases, optimizing its architecture for improved feature extraction and classification accuracy.

The proposed modified ResNet50 architecture introduces adjustments in its convolutional layers, feature map transitions, and classification layers to enhance efficiency and accuracy. Key modifications include restructuring the bottleneck blocks, optimizing feature scaling, and replacing the fully connected (FC) layer with a Global Average Pooling (GAP) layer, reducing overfitting while maintaining high classification performance. Transfer learning was employed to refine the model, leveraging pre-trained weights to improve accuracy with a limited dataset.

Experimental results demonstrated that the modified ResNet50 outperformed standard deep learning models, achieving a 99% classification accuracy, surpassing MobileNet (87%), EfficientNet (91%), and other CNN-based architectures. The model effectively identified diseases like Bacterial Leaf Blight, Rice Blast, and Tungro Virus, overcoming challenges in distinguishing visually similar diseases. This study highlights the potential of deep learning in precision agriculture, offering an efficient, scalable, and highly accurate tool for automated rice disease detection, ultimately benefiting farmers, researchers, and agricultural stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="flex items-start space-x-4">
                <Microscope className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Advanced Detection</h3>
                  <p className="text-sm text-gray-600">Enhanced ResNet50 architecture for classifying 14 distinct rice diseases</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Intelligent Analysis</h3>
                  <p className="text-sm text-gray-600">Optimized feature extraction and classification accuracy</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Database className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Transfer Learning</h3>
                  <p className="text-sm text-gray-600">Pre-trained weights for improved accuracy with limited data</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">High Accuracy</h3>
                  <p className="text-sm text-gray-600">99% classification accuracy in experimental results</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Keywords: Rice Disease Detection, Deep Learning, Modified ResNet50, Transfer Learning, CNN, Precision Agriculture
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center italic">
  © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
</p>
        </div>
      </div>
    </div>
  );
};

export default Home;