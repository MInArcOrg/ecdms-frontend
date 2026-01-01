// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import FilterList from './filter';
import { Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateActionConfig } from 'src/types/general/listing';
import { AbilityContext } from 'src/layouts/components/acl/Can';
import { IconButton, SxProps, Theme, Typography } from '@mui/material';
import ExportComponentOption, { ExportConfigValues, ExportFieldOption } from './export';

interface ListHeaderProps {
  createActionConfig: CreateActionConfig;
  hasFilter: boolean;
  hasSearch: boolean;
  handleFilter: (val: { [key: string]: any }) => void;
  features: {
    filter?: {
      enabled: boolean;
      onFilter: (values: Record<string, any>) => void;
      permission: {
        action: string;
        subject: string;
      };
      component?: React.ComponentType<any>;
    };
    search?: {
      enabled: boolean;
      onSearch: (searchTerm: string, searchingKey: string[]) => void;
      searchKeys?: string[];
      permission: {
        action: string;
        subject: string;
      };
    };
    export?: {
      enabled: boolean;
      onExport?: (exportConfig: {
        export: ExportConfigValues;
      }) => Promise<void>;
      availableFields?: ExportFieldOption[];
      permission: {
        action: string;
        subject: string;
      };
    };
  };
  FilterComponentItems?: React.ComponentType<any>;
  searchKeys: string[];
  title: string;
}

const ListHeader = (props: ListHeaderProps) => {
  const { title, features } = props;

  const { filter, export: exportFeature, search } = features
  // ** Props
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const { t: transl } = useTranslation();
  const [exportOpen, setExportOpen] = useState<boolean>(false);
  const toggleExport = () => {
    setExportOpen(!exportOpen);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const ability = useContext(AbilityContext);

  const performSearch = (term: string) => {
    const filterObject: { [key: string]: string } = {}; // Initialize filterObject
    props.searchKeys.forEach((item) => {
      filterObject[item] = term;
    });
    props.handleFilter(filterObject);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      search?.onSearch?.(term, features?.search?.searchKeys || []);
    }, 2000);

    setTimerId(newTimerId);
  };
  const handleFilterSubmit = (values: Record<string, any>) => {
    filter?.onFilter?.(values);
  }; const handleExportSubmit = (exportConfig: {
    format: string;
    fields: string[];
    currentPageOnly: boolean;
  }) => {
    if (exportFeature?.onExport) {
      exportFeature.onExport({
        export: {
          format: exportConfig.format,
          fields: exportConfig.fields,
          currentPageOnly: exportConfig.currentPageOnly,
        },
      });
    }
  };
  return (
    <Fragment>
      {filter?.enabled && filter.component && (
        <FilterList
          open={filterOpen}
          toggle={toggleFilter}
          handleFilter={handleFilterSubmit}
          FilterComponentItems={filter.component}
          initialValues={{
            is_child: false,
          }}
        />
      )}
      {exportFeature?.enabled && (
        <ExportComponentOption
          open={exportOpen}
          toggle={toggleExport}
          handleExport={handleExportSubmit}
          availableFields={exportFeature?.availableFields || []}
          availableFormats={["excel", "pdf"]}
        />
      )}
      <Box
        sx={{
          py: 4,
          px: 6,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography variant="h5">{transl(props.title)}</Typography>
        </Box>
        <Box
          sx={{
            rowGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          {search?.enabled && (
            <CustomTextField
              value={searchTerm}
              sx={{ mr: 4 }}
              placeholder={"Search " + transl(title)}
              onChange={handleSearchChange}
            />
          )}
          <Box
            sx={{
              rowGap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            {props.createActionConfig.show &&
              ability.can(props.createActionConfig.permission.action, props.createActionConfig.permission.subject) &&
              <AddButton onClick={props.createActionConfig.onClick} onlyIcon={props.createActionConfig.onlyIcon} />
            }
            {filter?.enabled && (
              <Button
                onClick={toggleFilter}
                variant="contained"
                sx={{ "& svg": { mr: 2 }, ml: 2 }}
              >
                <Icon fontSize="1.125rem" icon="tabler:adjustments" />
                {transl("filter")}
              </Button>
            )}
            {exportFeature?.enabled && exportFeature.onExport && (
              <Button
                onClick={toggleExport}
                variant="contained"
                sx={{ "& svg": { mr: 2 }, ml: 2 }}
              >
                <Icon fontSize="1.125rem" icon="tabler:file-export" />
                {transl("export")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
export const AddButton = ({ text, onClick, onlyIcon }: { text?: string; onClick: () => void; sx?: SxProps<Theme>; onlyIcon?: boolean }) => {
  const { t: transl } = useTranslation();
  return (onlyIcon ? (
    <IconButton color="primary" onClick={onClick}>
      <Icon icon="tabler:plus" fontSize={20} />
    </IconButton>
  ) :
    <Button onClick={onClick} variant="contained" sx={{ '& svg': { mr: 2 } }}>
      <Icon fontSize="1.125rem" icon="tabler:plus" />
      {text || transl('common.create')}
    </Button>
  )
}
export default ListHeader;
