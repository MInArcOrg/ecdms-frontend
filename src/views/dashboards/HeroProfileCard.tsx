import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Department from 'src/types/department/department'

interface HeroProfileCardProps {
 department?: Department
}

const HeroProfileCard: React.FC<HeroProfileCardProps> = ({
  department
}) => {
  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f2c6ff 0%, #b9d6ff 100%)'
        }}
      />
      <CardContent sx={{ position: 'relative', pt: 8 }}>
        <Avatar
          alt="Profile"
          sx={{
            width: 200,
            height: 200,
            position: 'absolute',
            top: 20,
            left: 5,
            border: (theme) => `4px solid ${theme.palette.background.paper}`,
            boxShadow: 3
          }}  
        />
        <Box sx={{ ml: 20 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {department?.name || 'Department'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {department?.description || 'Department Description'} 
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default HeroProfileCard

