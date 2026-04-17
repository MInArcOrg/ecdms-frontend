// src/views/analytics/components/AnalyticsViewTabs.tsx

import { Box, IconButton, Typography, CircularProgress } from '@mui/material'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'

import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectCategoryAnalyticsTable from 'src/views/analytics/Charts/Financial/ProjectCategoryAnalyticsTable'
import LocationCard from 'src/views/analytics/LocationCard'

import projectFinanceAnalyticsService from 'src/services/analytics/project/finanace'
import { MasterCategory } from 'src/types/master/master-types'
import useLocalStorage from 'src/hooks/use-local-storage'
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants'

const hashString = (value: string) => {
    let hash = 0
    for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0
    return Math.abs(hash)
}

const mulberry32 = (seed: number) => {
    let t = seed >>> 0
    return () => {
        t += 0x6d2b79f5
        let x = Math.imul(t ^ (t >>> 15), t | 1)
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296
    }
}

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
    const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false)

    const { data: apiResponse, isLoading, isError } = useQuery({
        queryKey: ['projectCategoryDepartmentsFinance', selectedCategory?.id],
        queryFn: () =>
            projectFinanceAnalyticsService.projectCategoryDepartmentsfinance(
                selectedCategory?.id || '',
                {}
            ),
        enabled: !!selectedCategory?.id && !dummyEnabled
    })

    const regions = [
        'FDRE',
        'Dire Dawa',
        'Southwest Ethiopia',
        'Benishangul',
        'Somali',
        'Harari',
        'Afar',
        'Sidama',
        'Addis Ababa',
        'Tigray',
        'Amhara',
        'Central Ethiopia',
        'South Ethiopia',
        'Oromia'
    ]

    const buildDummyFinanceSeries = () => {
        const seed = hashString(`${selectedCategory?.id || 'none'}:${selectedCategory?.title || ''}`)
        const r = mulberry32(seed)

        const main = regions.map((region) => {
            const rr = mulberry32(hashString(`${seed}:main:${region}`))
            const base = 0.35 + r() * 1.15
            const regionBias = 0.75 + rr() * 0.9
            const noise = (rr() - 0.5) * 0.25
            return Math.max(0, Number(((base + noise) * regionBias).toFixed(2)))
        })

        const supplement = main.map((v, i) => {
            const rr = mulberry32(hashString(`${seed}:supp:${regions[i]}`))
            return Number((v * (0.08 + rr() * 0.22)).toFixed(2))
        })
        const variation = main.map((v, i) => {
            const rr = mulberry32(hashString(`${seed}:var:${regions[i]}`))
            return Number((v * (0.05 + rr() * 0.2)).toFixed(2))
        })
        const omission = main.map((v, i) => {
            const rr = mulberry32(hashString(`${seed}:omi:${regions[i]}`))
            const val = v * (rr() * 0.06)
            return rr() < 0.15 ? 0 : Number(val.toFixed(2))
        })

        return [
            { name: 'Main Contract', data: main },
            { name: 'Supplement', data: supplement },
            { name: 'Variation', data: variation },
            { name: 'Omission', data: omission }
        ]
    }

    const dummyResponse = {
        payload: {
            series: buildDummyFinanceSeries(),
            departments: regions
        }
    }

    const resolvedResponse = (dummyEnabled ? dummyResponse : apiResponse) as any

    // Safely extract payload data
    const series = resolvedResponse?.payload?.series || []
    const labels = resolvedResponse?.payload?.departments || []

    const showLoader = (!dummyEnabled && isLoading) || isCategoryLoading

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
