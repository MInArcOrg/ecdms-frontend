import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetMultiplePhotos, getStaticPhoto } from 'src/services/utils/file-utils'; // Adjust path as needed
import { Box } from '@mui/material';
import ShowImageDialog from './image-dialog';

interface Props {
  id: string;
  refetch: boolean;
}

const ImageSlider: React.FC<Props> = ({ id, refetch }) => {
  const { data: images, isLoading, refetch: refetchImages } = useGetMultiplePhotos({ filter: { model_id: id } });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    refetchImages(); // Ensure data is refetched when `id` changes or manually triggered
  }, [id, refetch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only 1 slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Set to false if you don't want navigation arrows
    vertical: false, // Display slides horizontally
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint as needed for different screen sizes
        settings: {
          arrows: false // Hide arrows on smaller screens (optional)
        }
      }
    ]
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(getStaticPhoto(imageUrl));
    setOpen(true);
  };

  return (
    <div className="slider-container">
      <ShowImageDialog open={open} setOpen={setOpen} image={selectedImage} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Slider {...settings}>
            {images?.payload?.map((image) => (
              <Box onClick={() => handleImageClick(image.url)} key={image.id} className="slide">
                <img
                  src={getStaticPhoto(image.url)}
                  alt={image.title}
                  className="slider-image"
                  style={{ objectFit: 'cover', width: '100%' }} // Use objectFit: cover for full image fit
                />
              </Box>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
