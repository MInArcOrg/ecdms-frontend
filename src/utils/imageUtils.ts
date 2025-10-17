// utils/imageUtils.ts
export const getCroppedImg = (imageSrc: string, crop: { x: number; y: number; width: number; height: number }) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      canvas.width = crop.width;
      canvas.height = crop.height;

      if (ctx) {
        ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg');
      }
    };
    image.src = imageSrc;
  });
};
