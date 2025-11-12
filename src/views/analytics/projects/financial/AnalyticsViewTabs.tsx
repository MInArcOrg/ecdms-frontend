// src/views/analytics/components/AnalyticsViewTabs.tsx

import { Box, IconButton, Typography, CircularProgress } from '@mui/material'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'

import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectCategoryAnalyticsTable from 'src/views/analytics/Charts/Financial/ProjectCategoryAnalyticsTable'
import LocationCard from 'src/views/analytics/LocationCard'

import projectFinanceAnalyticsService from 'src/services/analytics/project/finanace'
import { MasterCategory } from 'src/types/master/master-types'

interface AnalyticsViewTabsProps {
    value: string
    onChange: (view: string) => void
    options?: { key: string; label: string; icon: string }[]
    categories: MasterCategory[]
    selectedCategory?: MasterCategory | null
    isCategoryLoading?: boolean
}

const defaultTabs = [
    { key: 'Graph', label: 'Graph', icon: 'mdi:chart-bar' },
    { key: 'Table', label: 'Table', icon: 'mdi:table' },
    { key: 'Location', label: 'Location', icon: 'mdi:map-marker' }
]

export default function AnalyticsViewTabs({
    value,
    onChange,
    options = defaultTabs,
    categories,
    selectedCategory,
    isCategoryLoading
}: AnalyticsViewTabsProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectCategoryDepartmentsFinance', selectedCategory?.id],
        queryFn: () =>
            projectFinanceAnalyticsService.projectCategoryDepartmentsfinance(
                selectedCategory?.id || '',
                {}
            ),
        enabled: !!selectedCategory?.id
    })

    // Safely extract payload data
    const series = data?.payload?.series || []
    const labels = data?.payload?.departments || []

    const showLoader = isLoading || isCategoryLoading

    return (
        <Box>
            {/* ---------- Tabs Header ---------- */}
            <Box display="flex" gap={2} my={3} alignItems="center" flexWrap="wrap">
                {options.map(({ key, label, icon }) => (
                    <IconButton
                        key={key}
                        aria-label={`${label} view`}
                        color={value === key ? 'primary' : 'default'}
                        onClick={() => onChange(key)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            borderRadius: 1,
                            px: 2,
                            bgcolor: value === key ? 'action.selected' : 'transparent',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        <Icon icon={icon} />
                        <Typography component="span" variant="body2" fontWeight={500}>
                            {label}
                        </Typography>
                    </IconButton>
                ))}
            </Box>

            {/* ---------- Tabs Body ---------- */}
            <Box mt={2} minHeight={400} >
                {showLoader ? (
                    <CircularProgress size={30} />
                ) : isError ? (
                    <Typography color="error">Failed to load analytics data.</Typography>
                ) : (
                    <>
                        {value === 'Graph' && (
                            <ProjectCategoryChart
                                series={series}
                                labels={labels}
                                title={`Regional Distribution of ${selectedCategory?.title || ''}`}
                                height={400}
                            />
                        )}

                        {value === 'Table' && (
                            <ProjectCategoryAnalyticsTable series={series} regions={labels} />
                        )}

                        {value === 'Location' && (
                            <LocationCard
                                categories={categories}
                                loading={isCategoryLoading||false}
                                baseUrl=""
                            />
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}
