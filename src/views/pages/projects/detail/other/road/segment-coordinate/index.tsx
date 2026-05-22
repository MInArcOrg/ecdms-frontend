'use client';

import { Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { SegmentCoordinate } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import SegmentCoordinateCard from './segment-coordinate-card';
import SegmentCoordinateDrawer from './segment-coordinate-drawer';
import { segmentCoordinateColumns } from './segment-coordinate-row';

interface SegmentCoordinateListProps {
    otherSubMenu?: DetailSubMenuItemChild;
    typeId: string;
    projectId: string;
}

const SegmentCoordinateList: React.FC<SegmentCoordinateListProps> = ({ otherSubMenu, projectId }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SegmentCoordinate | null>(null);
    const { t } = useTranslation();

    const fetchSegmentCoordinates = (params: GetRequestParam): Promise<IApiResponse<SegmentCoordinate[]>> =>
        projectOtherApiSecondService<SegmentCoordinate>().getAll(otherSubMenu?.apiRoute || '', {
            ...params,
            filter: { ...params.filter, project_id: projectId }
        });

    const {
        data: segmentCoordinates,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<SegmentCoordinate[]>({
        queryKey: ['segment-coordinates', projectId],
        fetchFunction: fetchSegmentCoordinates
    });

    const toggleDrawer = () => {
        setSelectedRow({} as SegmentCoordinate);
        setShowDrawer(!showDrawer);
    };

    const toggleDetailDrawer = () => {
        setSelectedRow({} as SegmentCoordinate);
        setShowDetailDrawer(!showDetailDrawer);
    };

    const handleEdit = (item: SegmentCoordinate) => {
        toggleDrawer();
        setSelectedRow(item);
    };

    const handleDelete = async (id: string) => {
        await projectOtherApiSecondService<SegmentCoordinate>().delete(otherSubMenu?.apiRoute || '', id);
        refetch();
    };

    const handleClickDetail = (item: SegmentCoordinate) => {
        toggleDetailDrawer();
        setSelectedRow(item);
    };

    const mapToDetailItems = (item: SegmentCoordinate) => [
        {
            title: t('project.other.segment-coordinate.details.road-segment-id'),
            value: item.roadSegment?.name || 'N/A'
        },
        {
            title: t('project.other.segment-coordinate.details.start-x'),
            value: item.start_x?.toString() || 'N/A'
        },
        {
            title: t('project.other.segment-coordinate.details.start-y'),
            value: item.start_y?.toString() || 'N/A'
        },
        {
            title: t('project.other.segment-coordinate.details.end-x'),
            value: item.end_x?.toString() || 'N/A'
        },
        {
            title: t('project.other.segment-coordinate.details.end-y'),
            value: item.end_y?.toString() || 'N/A'
        },
        {
            title: t('common.table-columns.created-at'),
            value: item.created_at ? formatCreatedAt(item.created_at) : 'N/A'
        }
    ];

    return (
        <Box>
            {showDrawer && (
                <SegmentCoordinateDrawer
                    otherSubMenu={otherSubMenu}
                    open={showDrawer}
                    toggle={toggleDrawer}
                    segmentCoordinate={selectedRow as SegmentCoordinate}
                    refetch={refetch}
                    projectId={projectId}
                />
            )}

            {showDetailDrawer && selectedRow && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapToDetailItems(selectedRow)}
                    hasReference={true}
                    id={selectedRow.id || ''}
                    fileType={uploadableProjectFileTypes.other.segmentCoordinate}
                    title={t('project.other.segment-coordinate.segment-coordinate-details')}
                />
            )}

            <ItemsListing
                title={t('project.other.segment-coordinate.title')}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: segmentCoordinateColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
                }}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <SegmentCoordinateCard
                        onDetail={handleClickDetail}
                        segmentCoordinate={data}
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
                        subject: 'segmentcoordinate'
                    }
                }}
                fetchDataFunction={refetch}
                items={segmentCoordinates || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    );
};

export default SegmentCoordinateList;
