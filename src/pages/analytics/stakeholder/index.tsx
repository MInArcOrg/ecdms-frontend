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
  Typography
} from '@mui/material';

// ** Third-Party Imports
import { useQuery } from '@tanstack/react-query';

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import RegionalTrendLineChart from 'src/views/analytics/General/regional-trend-line-chart';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

// ** Icons
import Icon from 'src/@core/components/icon';

// ** Services
import stakeholderGeneralAnalyticsService from 'src/services/analytics/stakeholder';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { generateYears } from 'src/utils/genertor/date';
import { useState, useEffect, useRef } from 'react';
import { MasterType } from 'src/types/master/master-types';
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';

// --- Components ---

const TypeRegionalTrendChart = ({ type }: { type: MasterType }) => {
  // 1. Fetch Categories for this Type
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['stakeholderCategories', type.id],
    queryFn: () => masterCategoryApiService.getAll('stakeholder', { filter: { stakeholdertype_id: type.id } })
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
  // If category is selected -> stakeholderSubcategoryMappingDepartment
  // If NO category is selected (All) -> stakeholderCategoryMappingDepartment
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ['stakeholderChart', type.id, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return projectGeneralAnalyticsService.projectSubcategoryMappingDepartment('project', selectedCategoryId, {});
      }
      return projectGeneralAnalyticsService.projectCategoryMappingDepartment('stakeholder', type.id, {});
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

const getStakeholderConfig = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('institution') || lowerName.includes('education')) return { icon: 'tabler:school', color: 'info' };
  if (lowerName.includes('contractor')) return { icon: 'tabler:helmet', color: 'warning' };
  if (lowerName.includes('consultant')) return { icon: 'tabler:briefcase', color: 'success' };
  if (lowerName.includes('association')) return { icon: 'tabler:users', color: 'primary' };
  return { icon: 'tabler:user', color: 'secondary' };
};

const StatCard = ({ title, count }: { title: string; count: number | string }) => {
  const { icon, color } = getStakeholderConfig(title);

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

const StakeholderAnlytics = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const { data: typeSummaryData, isLoading: isTypeSummaryLoading } = useQuery({
    queryKey: ['stakeholderTypeSummary'],
    queryFn: () => stakeholderGeneralAnalyticsService.getTypeSummary({})
  });

  // Fetch all stakeholder types
  const { data: stakeholderTypesData, isLoading: isTypesLoading } = useQuery({
    queryKey: ['stakeholderTypes'],
    queryFn: () => masterTypeApiService.getAll('stakeholder', {})
  });

  const stakeholderTypes: MasterType[] = stakeholderTypesData?.payload || [];
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    const content = reportRef.current;
    if (!content) return;

    setIsExporting(true);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setIsExporting(false);
      return;
    }

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(node => node.outerHTML)
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Stakeholder Analytics</title>
          ${styles}
          <style>
             @media print {
               @page { size: landscape; margin: 10mm; }
               body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
               .no-print { display: none !important; }
               /* Ensure charts are visible */
               .apexcharts-canvas { width: 100% !important; height: auto !important; }
             }
             body { background-color: white; padding: 20px; }
          </style>
        </head>
        <body>
          <div id="print-content">
            ${content.innerHTML}
          </div>
          <script>
            window.onload = () => {
              // Give some time for styles and charts to settle
              setTimeout(() => {
                window.print();
                // window.close();
              }, 1000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    setIsExporting(false);
  };

  return (
    <StakeholderAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6} ref={reportRef}>
          {/* Header Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
              <Button
                variant="tonal"
                color="secondary"
                startIcon={<Icon icon="tabler:printer" />}
                onClick={handlePrint}
                className="no-print"
              >
                Print
              </Button>
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
            stakeholderTypes.map((type) => (
              <Grid item xs={12} key={type.id}>
                <TypeRegionalTrendChart type={type} />
              </Grid>
            ))
          )}
        </Grid>
      </ApexChartWrapper>
    </StakeholderAnalyticsLayout>
  );
};

export default StakeholderAnlytics;
