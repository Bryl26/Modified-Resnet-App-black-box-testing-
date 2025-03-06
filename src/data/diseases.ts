import { Disease } from '../types';

export const diseases: Disease[] = [
  {
    id: 'bacterial-leaf-blight',
    name: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae',
    description: 'A destructive bacterial disease that causes wilting of seedlings and yellowing and drying of leaves.',
    symptoms: [
      'Water-soaked lesions on leaf edges',
      'Lesions turn yellow to white as they expand',
      'Leaves dry up and die',
      'Milky bacterial ooze may be visible'
    ],
    treatment: [
      'Use resistant rice varieties',
      'Avoid excessive nitrogen fertilization',
      'Ensure proper field drainage',
      'Apply copper-based bactericides preventatively'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513896006-da11a8473ece?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'rice-blast',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    description: 'One of the most destructive rice diseases worldwide, affecting all above-ground parts of the plant.',
    symptoms: [
      'Diamond-shaped lesions with gray centers',
      'Brown to reddish-brown borders around lesions',
      'Lesions can coalesce, causing leaves to die',
      'Can affect stems, nodes, and panicles'
    ],
    treatment: [
      'Plant resistant varieties',
      'Balanced fertilization (avoid excess nitrogen)',
      'Fungicide application at critical growth stages',
      'Proper water management'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895469-91e1e8190008?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'brown-spot',
    name: 'Brown Spot',
    scientificName: 'Cochliobolus miyabeanus',
    description: 'A fungal disease that primarily affects rice plants growing in nutrient-deficient soils.',
    symptoms: [
      'Oval or circular brown lesions on leaves',
      'Dark brown spots with gray centers',
      'Spots may have yellow halos',
      'Infected seeds show brown discoloration'
    ],
    treatment: [
      'Apply balanced fertilizers',
      'Treat seeds with fungicides before planting',
      'Foliar fungicide application',
      'Correct soil nutrient deficiencies, especially potassium'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895464-02eb7fc4a8d6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sheath-blight',
    name: 'Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    description: 'A fungal disease that affects the sheaths and leaves of rice plants, particularly in dense canopies.',
    symptoms: [
      'Oval or irregular greenish-gray lesions on leaf sheaths',
      'Lesions with dark borders',
      'Lesions can coalesce and move up the plant',
      'White fungal growth may be visible in humid conditions'
    ],
    treatment: [
      'Reduce plant density',
      'Apply fungicides at early infection stages',
      'Use silicon fertilizers to strengthen plant resistance',
      'Proper field drainage'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895472-62ee24cd80f1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tungro-virus',
    name: 'Tungro Virus Disease',
    scientificName: 'Rice Tungro Bacilliform Virus & Rice Tungro Spherical Virus',
    description: 'A viral disease transmitted by green leafhoppers that causes stunting and yellow or orange discoloration.',
    symptoms: [
      'Stunted growth',
      'Yellow to orange leaf discoloration',
      'Reduced tillering',
      'Delayed flowering and reduced yield'
    ],
    treatment: [
      'Use resistant varieties',
      'Control leafhopper vectors with insecticides',
      'Adjust planting time to avoid peak leafhopper populations',
      'Remove and destroy infected plants'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895477-9bff73bc0f08?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'leaf-scald',
    name: 'Leaf Scald',
    scientificName: 'Microdochium oryzae',
    description: 'A fungal disease that causes distinctive zonate lesions on rice leaves.',
    symptoms: [
      'Zonate lesions with alternating light and dark brown bands',
      'Lesions often start at leaf tips',
      'Affected areas may appear scalded or burnt',
      'Lesions can coalesce, causing leaf death'
    ],
    treatment: [
      'Use disease-free seeds',
      'Apply fungicides preventatively',
      'Balanced fertilization',
      'Proper spacing between plants'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895481-9eef22b362c6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'bakanae',
    name: 'Bakanae Disease',
    scientificName: 'Fusarium fujikuroi',
    description: 'A fungal disease that causes abnormal elongation of plants, making them taller than healthy ones.',
    symptoms: [
      'Abnormally tall and lanky plants',
      'Pale yellow-green leaves',
      'Empty panicles or poor grain filling',
      'White to pinkish fungal growth on lower parts'
    ],
    treatment: [
      'Seed treatment with fungicides',
      'Hot water treatment of seeds (52-54°C for 10-15 minutes)',
      'Remove and destroy infected plants',
      'Crop rotation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895484-44aa0d653f8d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'false-smut',
    name: 'False Smut',
    scientificName: 'Ustilaginoidea virens',
    description: 'A fungal disease that transforms individual rice grains into greenish-black spore balls.',
    symptoms: [
      'Individual grains transform into yellow-green spore balls',
      'Spore balls turn to greenish-black at maturity',
      'Velvety or powdery appearance of infected grains',
      'Usually affects only a few grains per panicle'
    ],
    treatment: [
      'Apply fungicides at booting and heading stages',
      'Use resistant varieties',
      'Proper timing of planting',
      'Balanced fertilization (avoid excess nitrogen)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895488-fb0a4c4b6424?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'grain-discoloration',
    name: 'Grain Discoloration',
    scientificName: 'Multiple Fungal Pathogens',
    description: 'A complex of fungal infections that cause discoloration of rice grains, reducing quality and marketability.',
    symptoms: [
      'Brown, black, or pink discoloration of grains',
      'Partial or complete discoloration',
      'Chalky or spotted appearance',
      'Reduced grain weight and quality'
    ],
    treatment: [
      'Apply fungicides during flowering and grain filling',
      'Harvest at optimal maturity',
      'Proper drying of harvested grains',
      'Store grains at appropriate moisture content'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895491-47e709df35db?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sheath-rot',
    name: 'Sheath Rot',
    scientificName: 'Sarocladium oryzae',
    description: 'A fungal disease that affects the uppermost leaf sheaths enclosing the young panicles.',
    symptoms: [
      'Irregular grayish-brown lesions on flag leaf sheath',
      'Rotting of the sheath enclosing the young panicle',
      'Panicles may not emerge completely',
      'Poor grain development or empty grains'
    ],
    treatment: [
      'Balanced fertilization',
      'Avoid high plant density',
      'Apply fungicides at booting stage',
      'Control insects that create entry points for the fungus'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895494-90f5a7b89d7e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'narrow-brown-leaf-spot',
    name: 'Narrow Brown Leaf Spot',
    scientificName: 'Cercospora janseana',
    description: 'A fungal disease characterized by narrow, brown lesions on leaves, sheaths, and hulls.',
    symptoms: [
      'Linear, narrow brown lesions parallel to leaf veins',
      'Short, reddish-brown streaks on leaf sheaths',
      'Lesions may have yellow halos',
      'Brown spots on grain husks'
    ],
    treatment: [
      'Apply fungicides preventatively',
      'Use resistant varieties',
      'Balanced fertilization',
      'Proper crop rotation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895498-c7da86b2d9f9?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'stem-rot',
    name: 'Stem Rot',
    scientificName: 'Magnaporthe salvinii',
    description: 'A fungal disease that affects the lower parts of the rice plant, causing lodging and yield loss.',
    symptoms: [
      'Black, irregular lesions on leaf sheaths near water line',
      'Rotting of stem tissue',
      'Lodging of plants',
      'Black sclerotia (fungal resting bodies) inside or outside stems'
    ],
    treatment: [
      'Drain fields periodically',
      'Apply fungicides preventatively',
      'Remove and destroy plant debris after harvest',
      'Crop rotation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895501-77a0b41e9c3a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'yellow-dwarf',
    name: 'Yellow Dwarf Disease',
    scientificName: 'Rice Yellow Dwarf Virus',
    description: 'A viral disease transmitted by leafhoppers that causes stunting and yellowing of rice plants.',
    symptoms: [
      'Stunted growth',
      'General yellowing of plants',
      'Excessive tillering',
      'Delayed or no flowering'
    ],
    treatment: [
      'Control leafhopper vectors with insecticides',
      'Use resistant varieties',
      'Adjust planting time to avoid peak vector populations',
      'Remove and destroy infected plants'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895505-50c165a9d8e1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'healthy',
    name: 'Healthy Rice Leaf',
    scientificName: 'N/A',
    description: 'A healthy rice leaf with no signs of disease or pest damage.',
    symptoms: [
      'Uniform green color',
      'No spots, lesions, or discoloration',
      'No deformities or abnormal growth',
      'Normal leaf texture and structure'
    ],
    treatment: [
      'Maintain balanced fertilization',
      'Proper water management',
      'Regular monitoring for early disease detection',
      'Integrated pest management practices'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1602513895509-a9517c74a2b3?q=80&w=1000&auto=format&fit=crop'
  }
];