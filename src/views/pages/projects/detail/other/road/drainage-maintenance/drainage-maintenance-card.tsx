'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { DrainageMaintenance } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DrainageMaintenanceCardProps {
    drainageMaintenance: DrainageMaintenance;
    refetch: () => void;
    onEdit: (item: DrainageMaintenance) => void;
    onDelete: (id: string) => void;
    onDetail: (item: DrainageMaintenance) => void;
}

const DrainageMaintenanceCard: React.FC<DrainageMaintenanceCardProps> = ({
    drainageMaintenance,
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
                            onClick={() => onDetail(drainageMaintenance)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            {drainageMaintenance?.roadSegment?.name || drainageMaintenance?.id?.slice(0, 8) + '...'}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.drainage-maintenance.details.road-segment-id')}: {drainageMaintenance?.roadSegment?.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.drainage-maintenance.details.soil-type-id')}: {drainageMaintenance?.soilType?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.drainage-maintenance.details.ground-water-impact-id')}: {drainageMaintenance?.groundWaterImpact?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('project.other.drainage-maintenance.details.slope-stability-id')}: {drainageMaintenance?.slopeStability?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('common.table-columns.created-at')}: {drainageMaintenance?.created_at ? formatCreatedAt(drainageMaintenance.created_at) : 'N/A'}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <FileDrawer id={drainageMaintenance.id} type={uploadableProjectFileTypes.other.drainageMaintenance} />
                <ModelAction
                    model="DrainageMaintenance"
                    model_id={drainageMaintenance.id}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    onEdit={() => onEdit(drainageMaintenance)}
                    onDelete={() => onDelete(drainageMaintenance.id)}
                    item={drainageMaintenance}
                    deletePermissionRule={{ action: 'delete', subject: 'drainagemaintenance' }}
                    editPermissionRule={{ action: 'update', subject: 'drainagemaintenance' }}
                    options={[]}
                />
            </CardActions>
        </Card>
    );
};

export default DrainageMaintenanceCard;
