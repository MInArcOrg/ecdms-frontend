import React, { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface WideCarouselProps {
  overlay?: React.ReactNode
  height?: number
  slides?: number[]
}

const SlideImage = ({ slide, height }: { slide: number; height: number }) => {
  const candidates = useMemo(
    () => [
      `/images/slider/IMAGES/${slide}.webp`,
      `/images/slider/IMAGES/${slide}.jpg`,
      `/images/slider/${slide}.webp`,
      `/images/slider/${slide}.jpg`
    ],
    [slide]
  )
  const [index, setIndex] = useState(0)
  const src = candidates[index]

  return (
    <Box
      component="img"
      alt={`Slide ${slide}`}
      src={src}
      onError={() => setIndex((current) => (current + 1 < candidates.length ? current + 1 : current))}
      sx={{ width: '100%', height, objectFit: 'cover', display: 'block' }}
    />
  )
}

const WideCarousel: React.FC<WideCarouselProps> = ({ overlay, height = 280, slides: slidesProp }) => {
  const theme = useTheme()
  const slides = useMemo(
    () => (slidesProp?.length ? slidesProp : Array.from({ length: 20 }, (_, i) => i + 1)),
    [slidesProp]
  )
  const overlayGradient = useMemo(() => {
    const primary = alpha(theme.palette.primary.main, 0.68)
    const secondary = alpha(theme.palette.secondary.main, 0.52)
    const clear = alpha(theme.palette.common.black, 0)
    return `linear-gradient(90deg, ${primary} 0%, ${secondary} 48%, ${clear} 100%)`
  }, [theme.palette.common.black, theme.palette.primary.main, theme.palette.secondary.main])
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
      <CardContent sx={{ p: 0, width: '100%' }}>
        <Slider {...settings}>
          {slides.map((slide) => (
            <Box key={slide} sx={{ position: 'relative' }}>
              <SlideImage slide={slide} height={height} />
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: overlayGradient,
            pointerEvents: 'none'
          }}
        />
        {overlay ? <Box sx={{ position: 'absolute', inset: 0, p: 6, zIndex: 2 }}>{overlay}</Box> : null}
      </CardContent>
    </Card>
  )
}

export default WideCarousel
