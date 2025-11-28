import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920',
    title: 'National Infrastructure Overview',
    subtitle: 'Latest Updates and KPIs'
  },
  {
    img: 'https://images.unsplash.com/photo-1581091870627-3a6109ad7c9f?q=80&w=1920',
    title: 'Resource Allocation',
    subtitle: 'Materials • Equipment • Labor'
  },
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920',
    title: 'Stakeholder Engagement',
    subtitle: 'Contractors • Consultants • Clients'
  },
  {
    img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1920',
    title: 'Projects Pipeline',
    subtitle: 'Road • Water • Energy'
  },
  {
    img: 'https://images.unsplash.com/photo-1504933551745-14af2f079ba9?q=80&w=1920',
    title: 'Compliance & Documents',
    subtitle: 'Permits • Reports • Drawings'
  }
]


const WideCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  } as const

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <Slider {...settings}>
          {slides.map((slide) => (
            <Box key={slide.title} sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={slide.img}
                alt={slide.title}
                sx={{ width: '100%', height: 240, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 16,
                  bottom: 20,
                  bgcolor: 'rgba(0,0,0,0.48)',
                  color: '#fff',
                  p: 2.5,
                  borderRadius: 3,
                  backdropFilter: 'blur(2px)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {slide.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {slide.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </CardContent>
    </Card>
  )
}

export default WideCarousel
