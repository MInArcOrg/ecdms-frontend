import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderLicenseApiService from 'src/services/stakeholder/stakeholder-license-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import LicenseCard from './stakeholder-license-card';
import LicenseDrawer from './stakeholder-license-drawer';
import type { StakeholderLicense } from 'src/types/stakeholder/stakeholder-license';
import { licenseColumns } from './stakeholder-license-row';

interface StakeholderLicenseListProps {
  stakeholderId: string;
  typeId: string;
}

const StakeholderLicenseList: React.FC<StakeholderLicenseListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderLicense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchLicenses = (params: GetRequestParam): Promise<IApiResponse<StakeholderLicense[]>> => {
    return stakeholderLicenseApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: licenses,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderLicense[]>({
    queryKey: ['licenses'],
    fetchFunction: fetchLicenses
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderLicense);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderLicense);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (license: StakeholderLicense) => {
    toggleDrawer();
    setSelectedRow(license);
  };

  const handleDelete = async (licenseId: string) => {
    await stakeholderLicenseApiService.delete(licenseId);
    refetch();
  };

  const handleClickDetail = (license: StakeholderLicense) => {
    toggleDetailDrawer();
    setSelectedRow(license);
  };

  const mapLicenseToDetailItems = (license: StakeholderLicense): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-license.form.license-type'),
      value: license.license_type || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.licence-category'),
      value: license.license_category || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.license-name'),
      value: license.license_name || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.license-scope'),
      value: license.license_scope || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.licensing-body'),
      value: license.licensing_body || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.license-number'),
      value: license.license_number || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.issue-date'),
      value: formatCreatedAt(license.issue_date) || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.expire-date'),
      value: formatCreatedAt(license.expire_date) || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-license.form.remark'),
      value: license.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: license?.created_at ? formatCreatedAt(license.created_at) : 'N/A'
    }
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);



  return (
    <Box>
      {showDrawer && (
        <LicenseDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          license={selectedRow as StakeholderLicense}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapLicenseToDetailItems(selectedRow as StakeholderLicense)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_LICENSE"
          title={t('stakeholder.stakeholder-license.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-license.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: licenseColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <LicenseCard
            onDetail={handleClickDetail}
            stakeholderLicense={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'license'
          }
        }}
        fetchDataFunction={refetch}
        items={licenses || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderLicenseList;
