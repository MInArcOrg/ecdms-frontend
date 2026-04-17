import { Icon } from '@iconify/react';
import { Autocomplete, Box, Card, CardContent, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { dropDownConfig } from 'src/configs/api-constants';
import { useAuth } from 'src/hooks/useAuth';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';
import departmentApiService from 'src/services/department/department-service';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';
import SalaryChart from 'src/views/analytics/layouts/ResourceAnalyticsLayout/SalaryChart';
import StickyHeaderTable from 'src/views/components/custom/table/sticky-header-table';

// Sample years list
const years = Array.from({ length: 10 }, (_, i) => ({
  id: 2021 + i,
  name: (2021 + i).toString()
}));

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type SalaryRow = {
  region: string;
  totalPublc: number;
  totalPrivate: number;
  malePblic: number;
  femalePublic: number;
  malePrivate: number;
  femalePrivate: number;
  totalAverage: number;
};

function Salary() {
  const { user } = useAuth();
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  // --- Fetch master data ---
  const { data: departments } = useQuery({
    queryKey: ['departments', user?.department_id],
    queryFn: () => departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }),
    enabled: !!user?.department_id && !dummyEnabled
  });

  const { data: studyFields, isLoading: fieldsLoading } = useQuery({
    queryKey: ['study-fields'],
    queryFn: () => generalMasterDataApiService.getAll('study-fields', dropDownConfig()),
    enabled: !dummyEnabled
  });

  const { data: studyLevels, isLoading: studyLevelsLoading } = useQuery({
    queryKey: ['study-levels'],
    queryFn: () => generalMasterDataApiService.getAll('study-levels', dropDownConfig()),
    enabled: !dummyEnabled
  });

  const { data: workExp, isLoading: workExpLoading } = useQuery({
    queryKey: ['work-experiences'],
    queryFn: () => generalMasterDataApiService.getAll('work-experiences', dropDownConfig()),
    enabled: !dummyEnabled
  });

  const { data: resourceSubCategories, isLoading: subCatLoading } = useQuery({
    queryKey: ['resource-subcategories'],
    queryFn: () => generalMasterDataApiService.getAll('resource-subcategories', dropDownConfig()),
    enabled: !dummyEnabled
  });

  const dummyDepartments = [
    { id: 'd-1', name: 'Addis Ababa' },
    { id: 'd-2', name: 'Oromia' },
    { id: 'd-3', name: 'Amhara' },
    { id: 'd-4', name: 'Tigray' }
  ];

  const dummyStudyFields = [
    { id: 'sf-1', title: 'Civil Engineering' },
    { id: 'sf-2', title: 'Electrical Engineering' },
    { id: 'sf-3', title: 'Architecture' },
    { id: 'sf-4', title: 'Project Management' }
  ];

  const dummyStudyLevels = [
    { id: 'sl-1', title: 'Diploma' },
    { id: 'sl-2', title: 'BSc' },
    { id: 'sl-3', title: 'MSc' },
    { id: 'sl-4', title: 'PhD' }
  ];

  const dummyWorkExp = [
    { id: 'we-1', title: '0-2 years' },
    { id: 'we-2', title: '2-5 years' },
    { id: 'we-3', title: '5-10 years' },
    { id: 'we-4', title: '10+ years' }
  ];

  const dummyResourceSubCategories = [
    { id: 'rsub-1', title: 'Skilled Labor' },
    { id: 'rsub-2', title: 'Unskilled Labor' },
    { id: 'rsub-3', title: 'Technicians' },
    { id: 'rsub-4', title: 'Supervision' }
  ];

  // --- States ---
  const [baseYear, setBaseYear] = useState<{ id: number; name: string } | null>(null);
  const [selectedStudyField, setSelectedStudyField] = useState<any>(null);
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<any>(null);
  const [selectedWorkExp, setSelectedWorkExp] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [tableView, setTableView] = useState(true);

  const baseYearIndex = years.findIndex((y) => y.id === baseYear?.id);
  const regions = (dummyEnabled ? dummyDepartments : departments?.payload) || [];

  const salarySeedKey = [
    selectedSubCategory?.id ?? '',
    selectedStudyField?.id ?? '',
    selectedStudyLevel?.id ?? '',
    selectedWorkExp?.id ?? '',
    baseYear?.id ?? ''
  ].join('|');

  const rowsOverride: SalaryRow[] = regions.map((region: any, index: number) => {
    const regionName = String(region.name ?? region.title ?? region.label ?? `Region ${index + 1}`);
    const baseSeed = hashString(`${salarySeedKey}:${String(baseYearIndex ?? '')}`);
    const rand = mulberry32(hashString(`${baseSeed}:${regionName}:${index}`));

    const totalPublc = 8000 + Math.floor(rand() * 17000);
    const totalPrivate = 7000 + Math.floor(rand() * 20000);
    const malePblic = Math.round(totalPublc * (0.55 + rand() * 0.15));
    const femalePublic = Math.max(0, totalPublc - malePblic);
    const malePrivate = Math.round(totalPrivate * (0.6 + rand() * 0.18));
    const femalePrivate = Math.max(0, totalPrivate - malePrivate);
    const totalAverage = Math.round((totalPublc + totalPrivate) / 2);

    return { region: regionName, totalPublc, totalPrivate, malePblic, femalePublic, malePrivate, femalePrivate, totalAverage };
  });

  return (
    <ResourceAnalyticsLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {/* Resource Subcategory */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant="body1">
                Resource Subcategory
              </Typography>
              <Autocomplete
                size="small"
                options={(dummyEnabled ? dummyResourceSubCategories : resourceSubCategories?.payload) || []}
                value={selectedSubCategory}
                onChange={(_, v) => setSelectedSubCategory(v)}
                getOptionLabel={(option) => option.title || ''}
                loading={!dummyEnabled && subCatLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select subcategory"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!dummyEnabled && subCatLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Study Field */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant="body1">
                Study Field
              </Typography>
              <Autocomplete
                size="small"
                options={(dummyEnabled ? dummyStudyFields : studyFields?.payload) || []}
                value={selectedStudyField}
                onChange={(_, v) => setSelectedStudyField(v)}
                getOptionLabel={(option) => option.title || ''}
                loading={!dummyEnabled && fieldsLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select field"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!dummyEnabled && fieldsLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Study Level */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant="body1">
                Study Level
              </Typography>
              <Autocomplete
                size="small"
                options={(dummyEnabled ? dummyStudyLevels : studyLevels?.payload) || []}
                value={selectedStudyLevel}
                onChange={(_, v) => setSelectedStudyLevel(v)}
                getOptionLabel={(option) => option.title || ''}
                loading={!dummyEnabled && studyLevelsLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select level"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!dummyEnabled && studyLevelsLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Work Experience */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant="body1">
                Work Experience
              </Typography>
              <Autocomplete
                size="small"
                options={(dummyEnabled ? dummyWorkExp : workExp?.payload) || []}
                value={selectedWorkExp}
                onChange={(_, v) => setSelectedWorkExp(v)}
                getOptionLabel={(option) => option.title || ''}
                loading={!dummyEnabled && workExpLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select experience"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {!dummyEnabled && workExpLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Year */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant="body1">
                Year
              </Typography>
              <Autocomplete
                size="small"
                options={years}
                value={baseYear}
                onChange={(_, v) => setBaseYear(v)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} placeholder="Select year" />}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Toggle between Table and Graph */}
      <Box display="flex" gap={2} my={3} alignItems="center">
        <IconButton aria-label="table view" color={tableView ? 'primary' : 'secondary'} onClick={() => setTableView(true)}>
          <Icon icon="mdi:table" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Table
          </Typography>
        </IconButton>

        <IconButton aria-label="chart view" color={!tableView ? 'primary' : 'secondary'} onClick={() => setTableView(false)}>
          <Icon icon="mdi:chart-bar" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Graph
          </Typography>
        </IconButton>
      </Box>

      {/* Table or Chart view */}
      <Box>
        {tableView ? (
          <Card>
            <CardContent>
              <StickyHeaderTable regions={regions} baseYear={baseYearIndex} years={years} rowsOverride={rowsOverride} seedKey={salarySeedKey} />
            </CardContent>
          </Card>
        ) : (
          <DatePickerWrapper>
            <SalaryChart years={years} regions={regions} baseYear={baseYearIndex} rowsOverride={rowsOverride} seedKey={salarySeedKey} />
          </DatePickerWrapper>
        )}
      </Box>
    </ResourceAnalyticsLayout>
  );
}

export default Salary;
