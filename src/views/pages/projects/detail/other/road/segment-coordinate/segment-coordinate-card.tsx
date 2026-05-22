'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { SegmentCoordinate } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface SegmentCoordinateCardProps {
    segmentCoordinate: SegmentCoordinate;
    refetch: () => void;
    onEdit: (item: SegmentCoordinate) => void;
    onDelete: (id: string) => void;
    onDetail: (item: SegmentCoordinate) => void;
}

const SegmentCoordinateCard: React.FC<SegmentCoordinateCardProps> = ({
    segmentCoordinate,
    refetch,
    onEdit,
    onDelete,
    onDetail
}) => {
    const { t } = useTranslation();

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight="bold">
                        <Typography
                            noWrap
                            component={Button}
                            onClick={() => onDetail(segmentCoordinate)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            {segmentCoordinate?.roadSegment?.name || segmentCoordinate?.id?.slice(0, 8) + '...'}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.segment-coordinate.details.road-segment-id')}: {segmentCoordinate?.roadSegment?.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.segment-coordinate.details.start-x')}: {segmentCoordinate?.start_x ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.segment-coordinate.details.start-y')}: {segmentCoordinate?.start_y ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.segment-coordinate.details.end-x')}: {segmentCoordinate?.end_x ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.segment-coordinate.details.end-y')}: {segmentCoordinate?.end_y ?? 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('common.table-columns.created-at')}: {segmentCoordinate?.created_at ? formatCreatedAt(segmentCoordinate.created_at) : 'N/A'}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <FileDrawer id={segmentCoordinate.id} type={uploadableProjectFileTypes.other.segmentCoordinate} />
                <ModelAction
                    model="SegmentCoordinate"
                    model_id={segmentCoordinate.id}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    onEdit={() => onEdit(segmentCoordinate)}
                    onDelete={() => onDelete(segmentCoordinate.id)}
                    item={segmentCoordinate}
                    deletePermissionRule={{ action: 'delete', subject: 'segmentcoordinate' }}
                    editPermissionRule={{ action: 'update', subject: 'segmentcoordinate' }}
                    options={[]}
                />
            </CardActions>
        </Card>
    );
};

export default SegmentCoordinateCard;
