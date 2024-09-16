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
import { IconButton, Typography } from '@mui/material';

interface ListHeaderProps {
  createActionConfig: CreateActionConfig;
  hasFilter: boolean;
  hasSearch: boolean;
  hasExport: boolean;
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
  const ability = useContext(AbilityContext);

  const performSearch = (term: string) => {
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
            {props.createActionConfig.show &&
              ability.can(props.createActionConfig.permission.action, props.createActionConfig.permission.subject) &&
              (props.createActionConfig.onlyIcon ? (
                <IconButton color="primary" onClick={props.createActionConfig.onClick}>
                  <Icon icon="tabler:plus" fontSize={20} />
                </IconButton>
              ) : (
                <Button onClick={props.createActionConfig.onClick} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                  <Icon fontSize="1.125rem" icon="tabler:plus" />
                  {transl('create')}
                </Button>
              ))}
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
