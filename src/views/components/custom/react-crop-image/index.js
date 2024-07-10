import { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Box, Button, IconButton, Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Icon } from '@iconify/react';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

function centerAspectCrop(mediaWidth, mediaHeight) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50
      },
      16 / 9,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ReactCropImage({ open, setOpen, onCropComplete }) {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState();

  const handleClose = () => {
    setImgSrc(null);
    setCrop({
      unit: '%',
      width: 50,
      height: 50
    });
    setCompletedCrop(null);
    setOpen(false);
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.8); // Adjust the quality parameter here (0 to 1)

    // Convert data URL to file
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], 'resourceImg.jpeg', { type: mime });

    onCropComplete(file);
    handleClose();
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll="body">
      <Paper sx={{ minWidth: '500px' }}>
        <DialogTitle id="form-dialog-title" textAlign="center">
          Select and crop Image to Upload
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <Icon icon="mdi:close" fontSize="1.2rem" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {completedCrop && (
            <Box my={4}>
              <Box>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'fill',
                    width: completedCrop.width,
                    height: completedCrop.height,
                    minHeight: '160px'
                  }}
                />
              </Box>
            </Box>
          )}
          {imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={16 / 9}
              style={{ maxHeight: '50vh', width: '100%' }}
            >
              <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} style={{ objectFit: 'fill', width: '100%' }} />
            </ReactCrop>
          )}

          <Box className="Crop-Controls">
            <Button variant="contained" fullWidth component="label">
              Choose an Image
              <input type="file" hidden onChange={onSelectFile} accept="image/*" />
            </Button>
          </Box>

          {completedCrop && (
            <Box display="flex" gap={4} mt={3}>
              <Button variant="contained" color="success" onClick={onDownloadCropClick}>
                Save
              </Button>

              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </Box>
          )}
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
