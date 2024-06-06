// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';

// ** Icon Imports
import Icon from 'src/@core/components/icon';
import FilterList from './filter';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ListHeaderProps {
  hasCreate: boolean;
  hasFilter: boolean;
  hasSearch: boolean;
  hasExport: boolean;
  createAction: () => void;
  handleFilter: (val: { [key: string]: any }) => void;
  FilterComponentItems?: React.ComponentType<any>;
  searchKeys: string[];
  title: string;
}

const ListHeader = (props: ListHeaderProps) => {
  // ** Props
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const { t: transl } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const performSearch = (term: string) => {
    console.log('filterObject', term);

    let filterObject: { [key: string]: string } = {}; // Initialize filterObject
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
      performSearch(term);
    }, 3000);

    setTimerId(newTimerId);
  };
  return (
    <Fragment>
      {props.FilterComponentItems && (
        <FilterList
          open={filterOpen}
          toggle={toggleFilter}
          handleFilter={props.handleFilter}
          FilterComponentItems={props.FilterComponentItems}
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
          {props.hasExport && (
            <Button color="secondary" variant="tonal" startIcon={<Icon icon="tabler:upload" />}>
              Export
            </Button>
          )}
        </Box>
        <Box
          sx={{
            rowGap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Box>
            {props.hasSearch && (
              <CustomTextField
                value={searchTerm}
                sx={{ mr: 4 }}
                placeholder={'Search ' + transl(props.title)}
                onChange={handleSearchChange}
              />
            )}
          </Box>
          <Box
            sx={{
              rowGap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            {props.hasCreate && (
              <Button onClick={props.createAction} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                <Icon fontSize="1.125rem" icon="tabler:plus" />
                {transl('create')}
              </Button>
            )}
            {props.hasFilter && (
              <Button onClick={toggleFilter} variant="contained" sx={{ '& svg': { mr: 2 }, ml: 2 }}>
                <Icon fontSize="1.125rem" icon="tabler:adjustments" />
                {transl('filter')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ListHeader;
