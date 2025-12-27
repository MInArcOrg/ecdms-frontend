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
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import RegionalTrendLineChart from 'src/views/analytics/General/regional-trend-line-chart';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

// ** Icons
import Icon from 'src/@core/components/icon';

// ** Services
import stakeholderAnalticsService from 'src/services/analytics/stakeholder';
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
  // If category is selected -> projectSubcategoryMappingDepartment
  // If NO category is selected (All) -> projectCategoryMappingDepartment
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ['stakeholderChart', type.id, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return projectGeneralAnalyticsService.projectSubcategoryMappingDepartment('stakeholder', selectedCategoryId, {});
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
    queryFn: () => stakeholderAnalticsService.getTypeSummary({})
  });

  // Fetch all stakeholder types
  const { data: stakeholderTypesData, isLoading: isTypesLoading } = useQuery({
    queryKey: ['stakeholderTypes'],
    queryFn: () => masterTypeApiService.getAll('stakeholder', {})
  });

  const stakeholderTypes: MasterType[] = stakeholderTypesData?.payload || [];
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    if (!reportRef.current) return;

    setIsExporting(true);
    // Use setTimeout to ensure the loading state is rendered before the heavy canvas operation blocks the thread
    setTimeout(async () => {
      try {
        const element = reportRef.current!;
        
        // Clone the element to ensure we capture the full height
        const clone = element.cloneNode(true) as HTMLElement;
        
        // Helper to copy canvas content (if any)
        const originalCanvases = element.querySelectorAll('canvas');
        const clonedCanvases = clone.querySelectorAll('canvas');
        Array.from(originalCanvases).forEach((canvas, i) => {
           const ctx = clonedCanvases[i].getContext('2d');
           if (ctx) {
             ctx.drawImage(canvas, 0, 0);
           }
        });

        // Set styles to ensure full visibility
        clone.style.position = 'absolute';
        clone.style.top = '-9999px'; // Move off-screen
        clone.style.left = '0';
        clone.style.width = `${element.scrollWidth}px`; // Maintain width
        clone.style.height = 'auto'; // Allow full height
        clone.style.zIndex = '-1';
        clone.style.overflow = 'visible'; // Ensure no scrollbars on clone
        clone.style.backgroundColor = '#ffffff'; // Ensure background

        document.body.appendChild(clone);

        const canvas = await html2canvas(clone, {
          scale: 1.5, // Reduced scale for better performance
          useCORS: true,
          logging: false,
          allowTaint: true,
          foreignObjectRendering: false, // Disable foreignObjectRendering as it can cause freezes with complex styles
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight
        });
        
        document.body.removeChild(clone);

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('stakeholder-analytics.pdf');
      } catch (error) {
        console.error('Error exporting PDF:', error);
      } finally {
        setIsExporting(false);
      }
    }, 100);
  };

  return (
    <StakeholderAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6} ref={reportRef}>
          {/* Header Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }} data-html2canvas-ignore>
                <Button 
                  variant="tonal" 
                  color="secondary" 
                  startIcon={isExporting ? <Icon icon="tabler:loader" className="animate-spin" /> : <Icon icon="tabler:download" />} 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                >
                  {isExporting ? 'Exporting...' : 'Export'}
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
