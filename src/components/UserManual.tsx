import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Sun, Camera, AlertCircle, HelpCircle, Mail, Phone, Globe } from 'lucide-react';

const UserManual: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          User Guide for Farmers
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Detection of Multiple Rice Diseases: A ResNet50 CNN Approach
        </h2>

        <div className="my-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Introduction</h3>
          <p className="text-gray-600">
            Welcome to the user guide for the Rice Disease Detection System, a powerful AI-driven tool designed to help farmers identify and manage multiple rice diseases using deep learning technology. This guide provides step-by-step instructions on how to use the system effectively.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">1. System Overview</h3>
          <p className="text-gray-600 mb-4">
            The Rice Disease Detection System utilizes ResNet50, a deep learning model trained to recognize and classify rice diseases based on leaf images. The system is designed for ease of use, requiring only a smartphone or a camera-enabled device.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Camera className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Real-time detection</h4>
                <p className="text-sm text-gray-600">AI-powered disease detection</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Book className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">User-friendly interface</h4>
                <p className="text-sm text-gray-600">Simple image upload functionality</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">2. Getting Started</h3>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">2.1 System Requirements</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>A smartphone, tablet, or computer with an internet connection</li>
              <li>A camera with a resolution of at least 5MP</li>
              <li>Access to the web-based detection platform</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">2.2 Registration & Login</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Visit the official detection platform.</li>
              <li>Register using your email and create a password.</li>
              <li>Log in to access the detection features.</li>
            </ol>
          </div>
        </div>

        <div className="my-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">3. How to Use the System</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">3.1 Capturing an Image</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Select a leaf showing signs of disease</li>
                <li>Ensure the image is well-lit and clear</li>
                <li>Capture using your device's camera</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">3.2 Uploading an Image</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Click on the Upload Image button</li>
                <li>Select the image from your device</li>
                <li>Wait for image processing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">3.3 Understanding Results</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>View detected disease name</li>
                <li>Check confidence level</li>
                <li>Read management recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Disease Management Recommendations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Management</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bacterial Leaf Blight (Xanthomonas oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Yellowing and wilting</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Ensure proper water drainage, avoid overhead irrigation</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rice Blast (Magnaporthe oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Brown lesions on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use resistant varieties, apply proper fertilization</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Brown Spot (Cochliobolus miyabeanus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Small brown spots on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use balanced fertilization, avoid nutrient deficiency</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sheath Blight (Rhizoctonia solani)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Irregularly shaped lesions</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Maintain plant spacing, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tungro Virus Disease (Rice Tungro Bacilliform Virus & Rice Tungro Spherical Virus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Yellow-orange leaves, stunted growthunted growth</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Control leafhoppers, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Leaf Scald (Microdochium oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Large brown lesions with a wavy edge</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve field drainage, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bakanae Disease (Fusarium fujikuroi)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Abnormally tall plants with thin leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use certified seeds, treat seeds with fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">False Smut (Ustilaginoidea virens)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Orange spore masses on grains</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Avoid excessive nitrogen fertilizer, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Grain Discoloration (Multiple Fungal Pathogens)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Various colored spots on grains</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Proper drying and storage, use disease-free seeds</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sheath Rot (Sarocladium oryzae)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Reddish-brown lesions on the sheath</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Use disease-free seeds, apply fungicides</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Narrow Brown Leaf Spot (Cercospora janseana)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Small linear brown lesions on leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve plant nutrition, use resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Stem Rot (Magnaporthe salvinii)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Dark lesions on lower stem</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Improve soil drainage, reduce nitrogen application</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Yellow Dwarf Disease (Rice Yellow Dwarf Virus)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Stunted growth, yellowing leaves</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Control insect vectors, plant resistant varieties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Healthy Rice Leaf (For reference and proper classification)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">No visible disease symptoms</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Maintain good agricultural practices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Best Practices for Accurate Detection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Sun className="h-6 w-6 text-yellow-600 mt-1" />
              <p className="text-gray-600">Always capture images in natural daylight</p>
            </div>
            <div className="flex items-start space-x-3">
              <Camera className="h-6 w-6 text-green-600 mt-1" />
              <p className="text-gray-600">Ensure the entire affected leaf is visible</p>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
              <p className="text-gray-600">Avoid blurry or pixelated images</p>
            </div>
            <div className="flex items-start space-x-3">
              <HelpCircle className="h-6 w-6 text-purple-600 mt-1" />
              <p className="text-gray-600">Capture multiple images for better accuracy</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Frequently Asked Questions (FAQs)</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800">Q1: Is the system free to use?</h4>
              <p className="text-gray-600">A: Yes, it is free for registered farmers.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Q2: Can I use it offline?</h4>
              <p className="text-gray-600">A: Yes, but an internet connection is required for AI processing, in contrast we have a offline mode where in you can capture the sample and for the processing you can still processed the image sample but the accuracy is based on the offline dataset saved when you install the app.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Q3: What happens if the system misidentifies a disease?</h4>
              <p className="text-gray-600">A: Users can provide feedback to improve future accuracy.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Support</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <p className="text-gray-600">Email: support@ricedetection.com || jamesbryan.tababa_cyn@isu.edu.ph</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <p className="text-gray-600">Phone: +63 906 689 4830</p>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-600" />
              <p className="text-gray-600">Website: www.ricedetection.com</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Thank you for using the Rice Disease Detection System! Your feedback helps us improve and support sustainable farming.</p>
        </div>
      </div>
    </div>
  );
};

export default UserManual;