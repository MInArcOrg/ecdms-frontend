import { Fragment, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Box } from '@mui/system'
import { CircularProgress, Typography } from '@mui/material'
import { getMultiplePhotos } from 'src/services/file/file-service'
import ApiErrors from '../../ApiErrors'
import ShowImageDialog from '../ShowImageDialog'

export default ({ id, refetch }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [{ data: images, loading, error }, getImages] = getMultiplePhotos(id)
  const [open, setOpen] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  useEffect(() => {
    getImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  return (
    <Fragment>
      <ShowImageDialog
        open={open}
        setOpen={setOpen}
        image={process.env.NEXT_PUBLIC_API_URL + images?.[currentSlide]?.path}
      />
      <Box className='navigation-wrapper'>
        {loading && <CircularProgress sx={{ ml: '50%' }} />}
        {error && <ApiErrors error={error} />}
        {images?.length > 0 ? (
          <Box
            ref={sliderRef}
            className='keen-slider'
            sx={{ borderRadius: '10px', maxHeight: '200px', width: '100%', mb: 3, backgroundColor: '#f5f5f5' }}
          >
            {images?.map((image, index) => (
              <Box key={index} className='keen-slider__slide' onClick={() => setOpen(true)}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${image?.path}`}
                  alt='swiper'
                  height='100%'
                  width='100%'
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant='body1' color='error'>
            No Images found
          </Typography>
        )}

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef?.current?.track?.details?.slides?.length - 1}
            />
          </>
        )}
      </Box>
      {loaded && instanceRef.current && (
        <Box className='dots'>
          {[...Array(instanceRef?.current?.track?.details?.slides?.length).keys()].map(idx => {
            return (
              <span
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              />
            )
          })}
        </Box>
      )}
    </Fragment>
  )
}

function Arrow(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />}
      {!props.left && <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />}
    </svg>
  )
}
