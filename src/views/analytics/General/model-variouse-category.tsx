// ** React Imports
import { useMemo } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'

// ** Types

// ** Service & Query
import projectGeneralAnalyticsService from 'src/services/analytics/project/general'
import { useQuery } from '@tanstack/react-query'
import { MasterType } from 'src/types/master/master-types'

const donutColors = ['#fdd835', '#009933', '#826bf8', '#0099ff', '#ffa1a1']

const ModelVariousCategory = ({ selectedType, model }: { selectedType: MasterType, model: string }) => {
    const theme = useTheme()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['CategoryMapping', model, selectedType?.id],
        queryFn: () => projectGeneralAnalyticsService.projectCategoryMapping(model, selectedType?.id, {}),
        enabled: !!selectedType?.id,
    })

    const categories = data?.payload?.categories ?? []
    const series = data?.payload?.data ?? []

    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                type: 'polarArea', // ✅ Use explicit union literal
                toolbar: { show: false },
            },
            stroke: { width: 0 },
            labels: categories,
            colors: donutColors,
            dataLabels: {
                enabled: true,
                formatter: (val: number) => `${Math.round(val)}%`,
                style: { fontSize: '12px' },
            },
            legend: {
                position: 'bottom',
                labels: { colors: theme.palette.text.secondary },
                itemMargin: { vertical: 3, horizontal: 10 },
            },
            fill: { opacity: 0.9 },
            yaxis: { show: false },
            responsive: [
                {
                    breakpoint: 992,
                    options: { chart: { height: 380 } },
                },
                {
                    breakpoint: 576,
                    options: { chart: { height: 320 } },
                },
            ],
        }),
        [categories, theme.palette.text.secondary]
    )

    return (
        <Card>
            <CardHeader
                title={selectedType?.title ?? 'Project Type'}
                subheader="Distribution across categories"
                subheaderTypographyProps={{
                    sx: { color: (theme) => `${theme.palette.text.disabled} !important` },
                }}
            />

            <CardContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                        <Typography color="error">Failed to load data</Typography>
                    </Box>
                ) : series.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                        <Typography color="text.secondary">No data available</Typography>
                    </Box>
                ) : (
                    <ReactApexcharts type="polarArea" height={400} options={options} series={series} />
                )}
            </CardContent>
        </Card>
    )
}

export default ModelVariousCategory
