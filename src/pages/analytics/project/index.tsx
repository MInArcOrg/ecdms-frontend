// ** React Imports

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  Menu
} from '@mui/material';

// ** Third-Party Imports
import { useQuery } from '@tanstack/react-query';

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import RegionalTrendLineChart from 'src/views/analytics/General/regional-trend-line-chart';
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

// ** Icons
import Icon from 'src/@core/components/icon';

// ** Services
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { generateYears } from 'src/utils/genertor/date';
import { useState, useEffect, useRef } from 'react';
import { MasterType } from 'src/types/master/master-types';

// --- Components ---

const TypeRegionalTrendChart = ({ type }: { type: MasterType }) => {
  // 1. Fetch Categories for this Type
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['projectCategories', type.id],
    queryFn: () => masterCategoryApiService.getAll('project', { filter: { projecttype_id: type.id } })
  });

  const categories = categoriesData?.payload || [];
  // Add "All" option to filters
  const filterOptions = [
    { label: 'All', value: '' },
    ...categories.map((c: any) => ({ label: c.title, value: c.id }))
  ];

  // 2. State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // 3. Set default category (now defaulting to '' for All)
  // No longer auto-selecting the first category

  // 4. Fetch Chart Data
  // If category is selected -> projectSubcategoryMappingDepartment
  // If NO category is selected (All) -> projectCategoryMappingDepartment
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ['projectChart', type.id, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return projectGeneralAnalyticsService.projectSubcategoryMappingDepartment('project', selectedCategoryId, {});
      }
      return projectGeneralAnalyticsService.projectCategoryMappingDepartment('project', type.id, {});
    },
    // Always enabled since we handle both cases
    enabled: true
  });

  const series = chartData?.payload?.series || [];
  const regions = chartData?.payload?.departments || [];

  return (
    <RegionalTrendLineChart
      title={type.title}
      series={series}
      categories={regions}
      filterOptions={filterOptions}
      defaultFilter={selectedCategoryId}
      onFilterChange={setSelectedCategoryId}
      loading={isCategoriesLoading || isChartLoading}
    />
  );
};

const getProjectConfig = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('institution') || lowerName.includes('education')) return { icon: 'tabler:school', color: 'info' };
  if (lowerName.includes('contractor')) return { icon: 'tabler:helmet', color: 'warning' };
  if (lowerName.includes('consultant')) return { icon: 'tabler:briefcase', color: 'success' };
  if (lowerName.includes('association')) return { icon: 'tabler:users', color: 'primary' };
  return { icon: 'tabler:user', color: 'secondary' };
};

const StatCard = ({ title, count }: { title: string; count: number | string }) => {
  const { icon, color } = getProjectConfig(title);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3 }}>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={color as any}
          sx={{ mb: 3.5, width: 42, height: 42 }}
        >
          <Icon icon={icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ProjectAnlytics = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const { data: typeSummaryData, isLoading: isTypeSummaryLoading } = useQuery({
    queryKey: ['projectTypeSummary'],
    queryFn: () => projectGeneralAnalyticsService.getTypeSummary({})
  });

  // Fetch all project types
  const { data: projectTypesData, isLoading: isTypesLoading } = useQuery({
    queryKey: ['projectTypes'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  });

  const projectTypes: MasterType[] = projectTypesData?.payload || [];
  const [isExporting, setIsExporting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePrintClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrint = (orientation: 'portrait' | 'landscape') => {
    handleClose();
    setIsExporting(true);

    // Create a style element for print settings
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        /* Reset body/html for full scrolling/printing */
        html, body {
          height: auto !important;
          overflow: visible !important;
          background-color: white !important;
        }

        /* Hide everything primarily */
        body * {
          visibility: hidden;
        }

        /* Target the print section */
        #print-section, #print-section * {
          visibility: visible;
        }

        #print-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100% !important;
          margin: 0 !important;
          padding: 10px !important;
          background-color: white;
          /* Ensure it sits on top of everything */
          z-index: 9999;
        }

        /* Handle Page Breaks */
        .MuiCard-root {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 16px;
          box-shadow: none !important;
          border: 1px solid #e0e0e0;
        }

        .MuiGrid-item {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Orientation specific adjustments */
        @page {
          size: ${orientation};
          margin: 10mm;
        }

        /* Utility to hide elements explicitly marked */
        .no-print {
          display: none !important;
        }

        /* Fix Charts */
        .apexcharts-canvas {
          width: 100% !important;
          height: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Give a small delay for styles to apply if needed, though usually instant
    setTimeout(() => {
      window.print();
      setIsExporting(false);
      document.head.removeChild(style);
    }, 100);
  };

  return (
    <ProjectAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6} ref={reportRef} id="print-section">
          {/* Header Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
              <Button
                variant="tonal"
                color="secondary"
                startIcon={<Icon icon="tabler:printer" />}
                onClick={handlePrintClick}
                className="no-print"
              >
                Print
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handlePrint('portrait')}>Print Portrait</MenuItem>
                <MenuItem onClick={() => handlePrint('landscape')}>Print Landscape</MenuItem>
              </Menu>
              <Typography variant="body2" sx={{ alignSelf: 'center', fontWeight: 'bold' }}>Registered</Typography>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select value="2025">
                  {
                    generateYears(1990, new Date().getFullYear()).map((year, index) => (
                      <MenuItem value={year} key={index}>{year}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={4}>
              {isTypeSummaryLoading ? (
                Array.from(new Array(4)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ height: 120, p: 3 }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="rectangular" height={40} width="40%" sx={{ mt: 2 }} />
                    </Card>
                  </Grid>
                ))
              ) : (
                typeSummaryData?.payload?.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatCard title={item.name} count={item.count} />
                  </Grid>
                ))
              )}
              {!isTypeSummaryLoading && (!typeSummaryData?.payload || typeSummaryData.payload.length === 0) && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">No data available</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Dynamic Charts for each Type */}
          {isTypesLoading ? (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" p={4}>
                <Typography>Loading charts...</Typography>
              </Box>
            </Grid>
          ) : (
            projectTypes.map((type) => (
              <Grid item xs={12} key={type.id}>
                <TypeRegionalTrendChart type={type} />
              </Grid>
            ))
          )}
        </Grid>
      </ApexChartWrapper>
    </ProjectAnalyticsLayout>
  );
};

export default ProjectAnlytics;
