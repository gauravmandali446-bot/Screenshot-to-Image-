import heic2any from 'heic2any';

/**
 * Loads an image from a URL and returns an HTMLImageElement
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error('Failed to load image. The file might be corrupted or in an unsupported format.'));
    img.src = url;
  });
}

/**
 * Extracts dimensions (width/height) of an image file
 */
export async function getImageDimensions(file: File): Promise<{ width: number; height: number; previewUrl: string }> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  let url = URL.createObjectURL(file);

  try {
    if (extension === 'heic' || extension === 'heif') {
      // For HEIC files, we need to convert to JPEG/PNG blob first to get dimensions and preview
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.3, // Low quality just for fast dimension extraction and preview
        });
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        url = URL.createObjectURL(blob);
      } catch (err) {
        throw new Error('HEIC conversion failed. The file may be invalid or too large.');
      }
    }

    const img = await loadImage(url);
    return {
      width: img.naturalWidth || 800,
      height: img.naturalHeight || 600,
      previewUrl: url,
    };
  } catch (error) {
    // Clean up url if we created a new one and threw an error
    if (url && !url.startsWith('blob:' + window.location.host)) {
      try { URL.revokeObjectURL(url); } catch (e) {}
    }
    throw error;
  }
}

/**
 * Converts any supported image file to JPEG locally in the browser
 */
export async function convertToJpg(
  file: File,
  quality: number,
  onProgress?: (progress: number) => void
): Promise<{ blob: Blob; width: number; height: number }> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  let sourceBlob: Blob = file;
  let isHeic = false;

  onProgress?.(10);

  if (extension === 'heic' || extension === 'heif') {
    isHeic = true;
    onProgress?.(30);
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: quality / 100,
      });
      sourceBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      onProgress?.(70);
    } catch (err) {
      throw new Error('HEIC/HEIF file conversion failed. Please make sure the file is not corrupted.');
    }
  }

  onProgress?.(80);

  // Load the image into HTMLImageElement
  const objectUrl = URL.createObjectURL(sourceBlob);
  try {
    const img = await loadImage(objectUrl);
    
    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to create canvas context.');
    }

    const width = img.naturalWidth || 800;
    const height = img.naturalHeight || 600;
    canvas.width = width;
    canvas.height = height;

    // IMPORTANT: Draw white background since JPG does not support transparency.
    // This prevents transparent PNGs/SVGs from turning into black squares.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw the image
    ctx.drawImage(img, 0, 0, width, height);
    onProgress?.(90);

    // Convert canvas to JPG blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (blob) {
            onProgress?.(100);
            resolve({ blob, width, height });
          } else {
            reject(new Error('Failed to convert canvas to JPEG blob.'));
          }
        },
        'image/jpeg',
        quality / 100
      );
    });
  } catch (err) {
    URL.revokeObjectURL(objectUrl);
    throw err;
  }
}

/**
 * Format bytes to a human-readable size
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
