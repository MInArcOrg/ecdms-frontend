import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderAccreditationApiService from 'src/services/stakeholder/stakeholder-accreditation-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderAccreditationCard from './stakeholder-accreditation-card';
import StakeholderAccreditationDrawer from './stakeholder-accreditation-drawer';
import { stakeholderAccreditationColumns } from './stakeholder-accreditation-row';
import { useTranslation } from 'react-i18next';

function StakeholderAccreditationList({ stakeholderId }: { stakeholderId: string }) {
    const [showDrawer, setShowDrawer] = useState(false);
    const { t: transl } = useTranslation();
    const [selectedRow, setSelectedRow] = useState<StakeholderAccreditation | null>(null);

    const fetchStakeholderAccreditations = (params: GetRequestParam): Promise<IApiResponse<StakeholderAccreditation[]>> => {
        return stakeholderAccreditationApiService.getAll({
            ...params,
            filter: { ...params.filter, stakeholder_id: stakeholderId }
        });
    };

    const {
        data: stakeholderAccreditations,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<StakeholderAccreditation[]>({
        queryKey: ['stakeholderAccreditations'],
        fetchFunction: fetchStakeholderAccreditations
    });

    const toggleDrawer = () => {
        setSelectedRow({} as StakeholderAccreditation);
        setShowDrawer(!showDrawer);
    };

    const handleEdit = (stakeholderAccreditation: StakeholderAccreditation) => {
        toggleDrawer();
        setSelectedRow(stakeholderAccreditation);
    };

    const handleDelete = async (id: string) => {
        await stakeholderAccreditationApiService.delete(id);
        refetch();
    };

    return (
        <Box>
            {showDrawer && (
                <StakeholderAccreditationDrawer
                    open={showDrawer}
                    toggle={toggleDrawer}
                    stakeholderAccreditation={selectedRow as StakeholderAccreditation}
                    refetch={refetch}
                    stakeholderId={stakeholderId}
                />
            )}
            <ItemsListing
                title={`stakeholder.stakeholder-accreditation.title`}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <StakeholderAccreditationCard stakeholderAccreditation={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
                )}
                tableProps={{
                    headers: stakeholderAccreditationColumns(() => { }, handleEdit, handleDelete, transl, refetch)
                }}
                createActionConfig={{
                    ...defaultCreateActionConfig,
                    onClick: toggleDrawer,
                    onlyIcon: false,
                    permission: {
                        action: 'create',
                        subject: 'stakeholderaccreditation'
                    }
                }}
                fetchDataFunction={refetch}
                items={stakeholderAccreditations || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    );
}
export default StakeholderAccreditationList;
