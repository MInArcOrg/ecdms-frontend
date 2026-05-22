import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { FileWithId } from 'src/types/general/file';

interface CustomMultiImageSelectorProps {
    label: string;
    images: FileWithId[];
    onImagesChange: (images: FileWithId[]) => void;
}

const CustomMultiImageSelector: React.FC<CustomMultiImageSelectorProps> = ({ label, images, onImagesChange }) => {
    const { t } = useTranslation();

    // Cleanup object URLs when component unmounts or images change (avoid memory leaks)
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (!img.isFetched && img.file && img.file.type.startsWith('image/')) {
                    // We might need an explicit thumbnail logic if we store them
                }
            });
        };
    }, [images]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newImages: FileWithId[] = Array.from(event.target.files).map((file) => ({
                id: `temp_${Date.now()}_${Math.random()}`,
                file
            }));
            onImagesChange([...images, ...newImages]);
        }
    };

    const handleRemoveImage = (id: string) => {
        const newImages = images.filter((img) => img.id !== id);
        onImagesChange(newImages);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <FormLabel component="legend">{t(label)}</FormLabel>
            {images.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                    {images.map((img, index) => {
                        const isLocalImage = !img.isFetched && img.file && img.file.type.startsWith('image/');
                        const previewUrl = isLocalImage ? URL.createObjectURL(img.file) : ''; // Consider memory-efficient mapping

                        return (
                            <Box key={img.id || index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {isLocalImage ? (
                                    <Box
                                        component="img"
                                        src={previewUrl}
                                        alt={img.file.name}
                                        sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1 }}
                                        onLoad={() => URL.revokeObjectURL(previewUrl)} // Release memory right after loading
                                    />
                                ) : (
                                    <Icon icon="mdi:image-outline" color="#4caf50" width={40} height={40} />
                                )}
                                <Typography variant="body1">{img.file?.name || 'Uploaded Image'}</Typography>
                                <IconButton onClick={() => handleRemoveImage(img.id)}>
                                    <Icon icon="tabler:trash" width={20} height={20} />
                                </IconButton>
                            </Box>
                        );
                    })}
                </Box>
            )}
            <Button variant="outlined" component="label" size="large" color="primary">
                <Icon icon="tabler:photo" width={20} height={20} /> {t('common.form.image-upload')}
                <input type="file" multiple hidden accept="image/*" onChange={handleImageChange} />
            </Button>
        </FormControl>
    );
};

export default CustomMultiImageSelector;
