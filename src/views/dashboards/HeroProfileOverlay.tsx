import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

interface HeroProfileOverlayProps {
  department?: { name?: string } | null
  avatarSrc?: string
}

const HeroProfileOverlay: React.FC<HeroProfileOverlayProps> = ({
  department,
  avatarSrc = '/images/pages/minster-logo-light.png'
}) => {
  // Half-overlay avatar only; title will be placed adjacent to carousel outside
  return (
    <Box sx={{ pointerEvents: 'none' }}>
      <Avatar
        src={avatarSrc}
        sx={{
          width: 130,
          height: 130,
          boxShadow: 6,
          border: '4px solid',
          borderColor: 'background.paper',
          bgcolor: 'background.paper'
        }}
      />
       <Box sx={{ textAlign:'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {department?.name || 'Department'}
                </Typography>
               
              </Box>
    </Box>
  )
}
export default HeroProfileOverlay
