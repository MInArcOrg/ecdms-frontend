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


interface WideCarouselProps {
  overlay?: React.ReactNode
}

const WideCarousel: React.FC<WideCarouselProps> = ({ overlay }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  } as const

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent 
             sx={{ width: '100%', height: 360, objectFit: 'cover' }}
      >
        <Slider {...settings}>
          {[1, 2, 4, 8].map((slide) => (
            <Box key={slide} sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={'/images/slider/'+slide.toString()+'.jpg'}
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
             
              </Box>
            </Box>
          ))}
        </Slider>
        {overlay ? (
          <Box sx={{ position: 'absolute', left: 35, bottom: 23, zIndex: 6 }}>{overlay}</Box>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default WideCarousel
