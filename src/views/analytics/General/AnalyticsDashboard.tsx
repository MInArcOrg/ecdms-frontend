// ** React Imports
import { useState, useRef, useEffect } from 'react';

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

// ** Icons
import Icon from 'src/@core/components/icon';

// ** Services
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { generateYears } from 'src/utils/genertor/date';
import { MasterType } from 'src/types/master/master-types';

interface AnalyticsDashboardProps {
  module: 'project' | 'stakeholder';
  Layout: React.ComponentType<{ children: React.ReactNode }>;
  summaryService: { getTypeSummary: (params: any) => Promise<any> };
}

const TypeRegionalTrendChart = ({ type, module }: { type: MasterType; module: 'project' | 'stakeholder' }) => {
  // 1. Fetch Categories for this Type
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [`${module}Categories`, type.id],
    queryFn: () =>
      masterCategoryApiService.getAll(module, {
        filter: { [`${module}type_id`]: type.id }
      })
  });

  const categories = categoriesData?.payload || [];

  // Add "All" option to filters
  const filterOptions = [
    { label: 'All', value: '' },
    ...categories.map((c: any) => ({ label: c.title, value: c.id }))
  ];

  // 2. State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // 3. Fetch Chart Data
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: [`${module}Chart`, type.id, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return projectGeneralAnalyticsService.projectSubcategoryMappingDepartment(module, selectedCategoryId, {});
      }
      return projectGeneralAnalyticsService.projectCategoryMappingDepartment(module, type.id, {});
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

const getConfig = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('institution') || lowerName.includes('education')) return { icon: 'tabler:school', color: 'info' };
  if (lowerName.includes('contractor')) return { icon: 'tabler:helmet', color: 'warning' };
  if (lowerName.includes('consultant')) return { icon: 'tabler:briefcase', color: 'success' };
  if (lowerName.includes('association')) return { icon: 'tabler:users', color: 'primary' };
  return { icon: 'tabler:user', color: 'secondary' };
};

const StatCard = ({ title, count }: { title: string; count: number | string }) => {
  const { icon, color } = getConfig(title);

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

const AnalyticsDashboard = ({ module, Layout, summaryService }: AnalyticsDashboardProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const { data: typeSummaryData, isLoading: isTypeSummaryLoading } = useQuery({
    queryKey: [`${module}TypeSummary`],
    queryFn: () => summaryService.getTypeSummary({})
  });

  // Fetch all types for the module
  const { data: typesData, isLoading: isTypesLoading } = useQuery({
    queryKey: [`${module}Types`],
    queryFn: () => masterTypeApiService.getAll(module, {})
  });

  const types: MasterType[] = typesData?.payload || [];
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

    const printSection = document.getElementById('print-section');
    if (!printSection) {
      setIsExporting(false);
      return;
    }

    // 1. Create a container for the print content
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';

    // 2. Clone the content
    // We use deep clone to get all children
    const clone = printSection.cloneNode(true) as HTMLElement;

    // 3. Handle Canvas elements (Charts often use Canvas)
    // cloneNode does not copy canvas content, so we must manually copy it
    const originalCanvases = printSection.querySelectorAll('canvas');
    const clonedCanvases = clone.querySelectorAll('canvas');

    originalCanvases.forEach((canvas, index) => {
      const clonedCanvas = clonedCanvases[index];
      const context = clonedCanvas.getContext('2d');
      if (context) {
        context.drawImage(canvas, 0, 0);
      }
    });

    // 4. Handle Form Inputs (Selects, TextFields)
    // cloneNode does not copy current values of inputs/selects
    const originalInputs = printSection.querySelectorAll('input, select, textarea');
    const clonedInputs = clone.querySelectorAll('input, select, textarea');

    originalInputs.forEach((input, index) => {
      const clonedInput = clonedInputs[index] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const original = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      clonedInput.value = original.value;

      // For checkboxes/radios
      if ((original as HTMLInputElement).checked !== undefined) {
        (clonedInput as HTMLInputElement).checked = (original as HTMLInputElement).checked;
      }
    });

    // Append clone to container
    printContainer.appendChild(clone);

    // Append container to body
    document.body.appendChild(printContainer);

    // 5. Inject Print Styles
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        /* Hide everything in body */
        body > * {
          display: none !important;
        }

        /* Show only our print container */
        body > #print-container {
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: auto !important;
          z-index: 9999 !important;
          background-color: white !important;
        }

        /* Ensure content inside is visible */
        #print-container * {
          visibility: visible !important;
        }
        
        /* Restore display for layout elements inside container */
        #print-container .MuiGrid-container {
          display: flex !important;
        }
        #print-container .MuiGrid-item {
          display: block !important;
        }
        #print-container .MuiCard-root {
           display: block !important;
           break-inside: avoid;
           page-break-inside: avoid;
           margin-bottom: 24px !important;
           box-shadow: none !important;
           border: 1px solid #e0e0e0 !important;
         }

         /* Expand Tables for Print */
         #print-container .MuiTableContainer-root {
            max-height: none !important;
            overflow: visible !important;
         }
 
         /* Hide elements marked as no-print */
        .no-print {
          display: none !important;
        }

        /* Orientation */
        @page {
          size: ${orientation};
          margin: 10mm;
        }
      }
    `;
    document.head.appendChild(style);

    // 6. Print and Cleanup
    // Small delay to ensure DOM is updated and styles applied
    setTimeout(() => {
      window.print();

      // Cleanup
      document.body.removeChild(printContainer);
      const printStyle = document.getElementById('print-styles');
      if (printStyle) {
        document.head.removeChild(printStyle);
      }
      setIsExporting(false);
    }, 500);
  };

  return (
    <Layout>
      <ApexChartWrapper>
        <Grid container spacing={6} ref={reportRef} id="print-section">
          {/* Header Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
              <Button
                variant="tonal"
                color="primary"
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
            types.map((type) => (
              <Grid item xs={12} key={type.id}>
                <TypeRegionalTrendChart type={type} module={module} />
              </Grid>
            ))
          )}
        </Grid>
      </ApexChartWrapper>
    </Layout>
  );
};

export default AnalyticsDashboard;
