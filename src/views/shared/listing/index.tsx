import { Box, Card } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { GetRequestParam, defaultGetRequestParam } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';
import Loader from 'src/views/components/loader';
import Page from 'src/views/components/page/page';
import PaginationComponent from '../pagination';
import ListHeader from './header';
import GridListing from './list-types/grid-listing';
import ListListing from './list-types/list-listing';
import MasonryListing from './list-types/masonry-listing';
import TableListing from './list-types/table-listing';
const ItemsListing = <T extends {}>({
  items,
  pagination,
  fetchDataFunction,
  ItemViewComponent,
  title,
  baseUrl,
  isLoading = false,
  type = ITEMS_LISTING_TYPE.grid.value,
  onPaginationChange,
  additionalParams = {},
  onCreateClick,
  tableProps,
  hasListHeader = true,
  hasCreate = true,
  hasFilter = false,
  hasSearch = false,
  hasExport = false,
  FilterComponentItems,
  searchKeys = []
}: {
  items: T[];
  pagination?: Pagination | null;
  fetchDataFunction?: any;
  ItemViewComponent?: React.ComponentType<{ data: T }>;
  title?: string;
  baseUrl?: string;
  isLoading?: boolean;
  type?: string;
  onPaginationChange?: (pageSize: any, page: any) => void;
  additionalParams?: any | null;
  onCreateClick?: () => void;
  tableProps?: {
    headers: GridColDef[];
  };
  hasCreate?: boolean;
  hasFilter?: boolean;
  hasSearch?: boolean;
  hasExport?: boolean;
  FilterComponentItems?: React.ComponentType<any>;
  searchKeys?: string[];
  hasListHeader?: boolean;
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const [fetchRequestParams, setFetchRequestParams] = useState<GetRequestParam>(defaultGetRequestParam);
  const onPagination =
    onPaginationChange ||
    ((pageSize: any, page: any) => {
      const fetchParam: GetRequestParam = {
        ...fetchRequestParams,
        locale: i18n.language,
        ...additionalParams,
        pagination: { pageSize: pageSize, page: page }
      };
      fetchDataFunction(fetchParam);
    });

  const handleFilter = (values: { [key: string]: any }) => {
    setFetchRequestParams({ ...fetchRequestParams, filter: values });
    fetchDataFunction({ ...fetchRequestParams, filter: values });
  };
  const listingComponents = {
    [ITEMS_LISTING_TYPE.masonry.value]: ItemViewComponent && <MasonryListing ItemViewComponent={ItemViewComponent} items={items} />,
    [ITEMS_LISTING_TYPE.list.value]: ItemViewComponent && <ListListing ItemViewComponent={ItemViewComponent} items={items} />,
    [ITEMS_LISTING_TYPE.table.value]: tableProps?.headers && (
      <TableListing
        isLoading={isLoading}
        pagination={pagination as Pagination}
        onPagination={onPagination}
        items={items}
        columns={tableProps?.headers}
      />
    ),
    default: ItemViewComponent && <GridListing ItemViewComponent={ItemViewComponent} items={items} />
  };
  const handleCreate = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      router.push(`${baseUrl}/create`);
    }
  };
  return (
    <Page titleId={title}>
      {hasListHeader && (
        <ListHeader
          hasCreate={hasCreate}
          hasFilter={hasFilter}
          FilterComponentItems={FilterComponentItems}
          createAction={handleCreate}
          handleFilter={handleFilter}
          hasExport={hasExport}
          hasSearch={hasSearch}
          searchKeys={searchKeys}
          title={title || ''}
        ></ListHeader>
      )}

      {isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        isArray(items) && (
          <Fragment>
            <Box>{listingComponents[type] || listingComponents.default}</Box>
            <></>
            {type !== ITEMS_LISTING_TYPE.table.value && pagination && (
              <Card>
                <PaginationComponent onPaginationChange={onPagination} pagination={pagination}></PaginationComponent>
              </Card>
            )}
          </Fragment>
        )
      )}
    </Page>
  );
};
export default ItemsListing;
