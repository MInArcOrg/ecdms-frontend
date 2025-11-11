// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import {
    Box,
    Grid,
    Card,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Custom Styles
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** API Services
import masterTypeApiService from 'src/services/master-data/master-type-service'
import TypeCardStat from '../../General/type-cards'

// ** Props
interface ScrollableStatCardsProps {
    model: string
    onSelect?: (type: any) => void
}

const ScrollableStatCards = ({ model, onSelect }: ScrollableStatCardsProps) => {
    const theme = useTheme()
    const desktop = useMediaQuery(theme.breakpoints.up('md'))
    const [selected, setSelected] = useState<string | null>(null)

    const { data: types, isLoading } = useQuery({
        queryKey: ['masterType', model],
        queryFn: () => masterTypeApiService.getAll(model, {}),
        enabled: !!model,
    })

    const handleSelect = (type: any) => {
        setSelected(type.id)
        if (onSelect) onSelect(type)
    }

    return (
        <Box
            sx={{
                p: 2,
                height: 300, // Container height
                display: 'flex',
                flexDirection: 'column',
            }}
        >


            <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
                <PerfectScrollbar options={{ suppressScrollY: desktop, wheelPropagation: false }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: desktop ? 'row' : 'column',
                            alignItems: 'stretch',
                            gap: 2,
                            p: 1,
                            height: '100%',
                        }}
                    >
                        {isLoading ? (
                            <Typography variant="body2">Loading types...</Typography>
                        ) : (
                            types?.payload?.map((type: any, index: number) => {
                                const isSelected = selected === type.id
                                return (
                                    <Box
                                        key={type.id || index}
                                        onClick={() => handleSelect(type)}
                                        sx={{
                                            width: desktop ? 210 : '100%',
                                            flexShrink: 0,
                                            cursor: 'pointer',
                                            borderRadius: '12px',
                                            border: `3px solid ${isSelected
                                                ? theme.palette.primary.main
                                                : theme.palette.divider
                                                }`,
                                            color: isSelected
                                                ? theme.palette.primary.contrastText
                                                : theme.palette.text.primary,
                                            transition: 'all 0.3s ease',
                                            boxShadow: isSelected
                                                ? theme.shadows[5]
                                                : theme.shadows[1],
                                            backgroundColor: theme.palette.background.paper,
                                            transform: isSelected
                                                ? 'translateY(-3px)'
                                                : 'translateY(0px)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: theme.shadows[3],
                                            },
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '100%',
                                            minHeight: desktop ? '100%' : 'auto',
                                        }}
                                    >
                                        <TypeCardStat
                                            stats="24.67k"
                                            chipText="+25.2%"
                                            avatarColor="info"
                                            chipColor="default"
                                            title={type.title}
                                            subtitle="Last week"
                                            avatarIcon="tabler:chart-bar"
                                        />
                                    </Box>
                                )
                            })
                        )}
                    </Box>
                </PerfectScrollbar>
            </Box>
        </Box >
    )
}

export default ScrollableStatCards
