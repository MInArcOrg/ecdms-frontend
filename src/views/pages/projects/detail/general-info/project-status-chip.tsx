import { Box, CardContent, Grid, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

function ProjectStatusChip({ data, onClick }: { data: string, onClick: () => void }) {
    if (data === 'Active') {
        return (
            <CustomChip
                label='Active'
                color='info'
                rounded
                size='small'
                skin='light'
                sx={{
                    '& .MuiChip-label': { textTransform: 'capitalize' },
                    // '&:hover': { color: '#fff' },
                    cursor: 'pointer',
                    height: 15
                }}
                onClick={onClick}
            />
        )
    } else if (data === 'Terminated') {
        return (
            <CustomChip
                label='Terminated'
                color='error'
                rounded
                size='small'
                skin='light'
                sx={{
                    '& .MuiChip-label': { textTransform: 'capitalize' },
                    height: 15,
                    cursor: 'pointer'
                }}
                onClick={onClick}
            />
        )
    } else if (data === 'Pending') {
        return (
            <CustomChip
                label='Pending'
                color='warning'
                rounded
                size='small'
                skin='light'
                sx={{
                    '& .MuiChip-label': { textTransform: 'capitalize' },
                    height: 15,
                    cursor: 'pointer'
                }}
                onClick={onClick}
            />
        )
    } else if (data === 'Completed') {
        return (
            <CustomChip
                label='Completed'
                color='success'
                rounded
                size='small'
                skin='light'
                sx={{
                    '& .MuiChip-label': { textTransform: 'capitalize' },
                    height: 15,
                    cursor: 'pointer'
                }}
                onClick={onClick}
            />
        )
    }

    return (
        <CustomChip
            label='No Status'
            color='primary'
            rounded
            size='small'
            skin='light'
            sx={{
                '& .MuiChip-label': { textTransform: 'capitalize' },
                height: 15,
                cursor: 'pointer'
            }}
        />
    )
}

export default ProjectStatusChip
