'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalLicenseApiService from 'src/services/resource/professional-license-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { ProfessionalLicense } from 'src/types/resource';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProfessionalLicenseCard from './professional-license-card';
import ProfessionalLicenseDrawer from './professional-license-drawer';
import { professionalLicenseColumns } from './professional-license-row';

interface ProfessionalLicenseListProps {
    model: string;
    professionalId: string;
}

const ProfessionalLicenseList: React.FC<ProfessionalLicenseListProps> = ({ professionalId }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ProfessionalLicense | null>(null);
    const { t } = useTranslation();

    const fetchLicenses = (params: GetRequestParam): Promise<IApiResponse<ProfessionalLicense[]>> =>
        professionalLicenseApiService.getAll({
            ...params,
            filter: { ...params.filter, professional_id: professionalId }
        });

    const {
        data: licenses,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<ProfessionalLicense[]>({
        queryKey: ['professional-licenses', professionalId],
        fetchFunction: fetchLicenses
    });

    const toggleDrawer = () => {
        setSelectedRow({} as ProfessionalLicense);
        setShowDrawer(!showDrawer);
    };

    const toggleDetailDrawer = () => {
        setSelectedRow({} as ProfessionalLicense);
        setShowDetailDrawer(!showDetailDrawer);
    };

    const handleEdit = (license: ProfessionalLicense) => {
        toggleDrawer();
        setSelectedRow(license);
    };

    const handleDelete = async (id: string) => {
        await professionalLicenseApiService.delete(id);
        refetch();
    };

    const handleClickDetail = (license: ProfessionalLicense) => {
        toggleDetailDrawer();
        setSelectedRow(license);
    };

    const mapToDetailItems = (license: ProfessionalLicense) => [
        { title: t('resources.professional.license.license-number'), value: license.license_number },
        { title: t('resources.professional.license.license-name'), value: license.license_name },
        { title: t('resources.professional.license.license-type'), value: license.licenseType?.title || 'N/A' },
        { title: t('resources.professional.license.license-category'), value: license.licenseCategory?.title || 'N/A' },
        { title: t('resources.professional.license.license-scope'), value: license.license_scope || 'N/A' },
        { title: t('resources.professional.license.licensing-body'), value: license.licensing_body || 'N/A' },
        { title: t('resources.professional.license.issue-date'), value: formatDynamicDate(license.issue_date) || 'N/A' },
        { title: t('resources.professional.license.expire-date'), value: formatDynamicDate(license.expire_date) || 'N/A' },
        { title: t('resources.professional.license.remark'), value: license.remark || 'N/A' },
        { title: t('common.created-at'), value: license.created_at ? formatCreatedAt(license.created_at) : 'N/A' }
    ];

    return (
        <Box>
            {showDrawer && (
                <ProfessionalLicenseDrawer
                    open={showDrawer}
                    toggle={toggleDrawer}
                    license={selectedRow}
                    refetch={refetch}
                    professionalId={professionalId}
                />
            )}

            {showDetailDrawer && selectedRow && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapToDetailItems(selectedRow)}
                    id={selectedRow.id || ''}
                    hasReference={true}
                    fileType="PROFESSIONAL_LICENSE"
                    title={t('resources.professional.license.details')}
                />
            )}

            <ItemsListing
                title={t('resources.professional.license.title')}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: professionalLicenseColumns(handleClickDetail, handleEdit, handleDelete, t)
                }}
                isLoading={false}
                ItemViewComponent={({ data }) => (
                    <ProfessionalLicenseCard
                        onDetail={handleClickDetail}
                        license={data}
                        onEdit={handleEdit}
                        refetch={refetch}
                        onDelete={handleDelete}
                    />
                )}
                createActionConfig={{
                    ...defaultCreateActionConfig,
                    onClick: toggleDrawer,
                    onlyIcon: false,
                    permission: { action: 'create', subject: 'professionallicense' }
                }}
                fetchDataFunction={refetch}
                items={licenses || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    );
};

export default ProfessionalLicenseList;
