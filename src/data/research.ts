

// Add a paper = add one object to this list. Both layouts (desktop cards, mobile list) read from here.
// Anything you don't know stays null (or []), and empty fields are simply hidden.
// Please don't guess DOIs, years or author names.
//
// Thumbnails: put images in /public/images/research and point to them like '/images/research/paper-1.png'.
// A missing image just shows a neutral placeholder.







import type { ResearchPaper } from '../types'

export const research: ResearchPaper[] = [
  {
    id: 'pox-skin-diseases',

    title:
      'Multiple Pox and Skin Diseases Classification Using Transfer Learning Approach',

    category: 'Computer Vision',

    tags: [
      '6,756 Medical Images',
      '5 Disease Classes',
      'DenseNet201',
      'Transfer Learning',
      'CLAHE Enhancement',
      'Data Augmentation',
      'Class Rebalancing',
    ],

    summary:
       'Developed a transfer learning-based approach for classifying five skin disease categories using dermatological images. Applying CLAHE enhancement, data augmentation, and class rebalancing, DenseNet201 achieved 98.39% classification accuracy.',

    thumbnail: '/images/research/pox-skin-diseases.jpg',

    authors: [
      'Tridib Chakraborty',
      'Sujana Islam Smrity',
      'Tarek Rahman',
      'Dr. Ahmed Wasif Reza',
    ],

    venue: 'ICDMIS 2025 · Springer LNNS',

    year: 2026,

    publicationStatus: 'Published',

    doi: 'https://doi.org/10.1007/978-3-032-25949-3_16',

    paperUrl:
      'https://link.springer.com/chapter/10.1007/978-3-032-25949-3_16',

    codeUrl: null,
    detailsUrl: null,
  },

  {
    id: 'colorectal-cancer',

    title:
      'Colorectal Cancer Classification Using Transfer Learning',

    category: 'Medical AI',

    tags: [
      '8,750 Histopathology Images',
      '11 Tissue Classes',
      'DenseNet201',
      'CNN Benchmarking',
      'Transfer Learning',
      '80:20 Data Split',
    ],

    summary:
      'Investigating the potential of automated histopathological analysis, this research benchmarks five pretrained convolutional neural network architectures for colorectal cancer tissue classification. Using 8,750 images distributed across 11 tissue categories and an 80:20 train-test split, the study compares NASNetMobile, NASNetLarge, InceptionResNetV2, DenseNet201, and SENet. DenseNet201 emerged as the strongest performer, recording 94.46% classification accuracy.',

    thumbnail: '/images/research/colorectal-cancer.png',

    authors: [
      'Tridib Chakraborty',
      'Anika Tabassum Tanha',
      'Korobi Sarker',
      'Dr. Ahmed Wasif Reza',
    ],

    venue: 'ICDMIS 2025 · Springer LNNS',

    year: 2026,

    publicationStatus: 'Published',

    doi: 'https://doi.org/10.1007/978-3-032-25949-3_30',

    paperUrl:
      'https://link.springer.com/chapter/10.1007/978-3-032-25949-3_30',

    codeUrl: null,
    detailsUrl: null,
  },
]

