export interface ConversionItem {
  id: string;
  file: File;
  name: string;
  inputFormat: string;
  originalSize: number;
  originalWidth: number | null;
  originalHeight: number | null;
  previewUrl: string;
  status: 'pending' | 'converting' | 'success' | 'error';
  progress: number;
  quality: number;
  convertedUrl: string | null;
  convertedSize: number | null;
  errorMessage: string | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}
