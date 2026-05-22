'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { DrainageMaintenance } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: DrainageMaintenance;
}

export const drainageMaintenanceColumns = (
    onDetail: (item: DrainageMaintenance) => void,
    onEdit: (item: DrainageMaintenance) => void,
    onDelete: (id: string) => void,
    t: any,
    refetch: () => void
): GridColDef[] => [
        {
            flex: 0.15,
            minWidth: 150,
            headerName: t('project.other.drainage-maintenance.details.road-segment-id'),
            field: 'road_segment_id',
            renderCell: ({ row }: CellType) => (
                <Typography
                    noWrap
                    component={Button}
                    onClick={() => onDetail(row)}
                    sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    {row.roadSegment?.name || t('common.not-available')}
                </Typography>
            )
        },
        {
            flex: 0.12,
            minWidth: 120,
            headerName: t('project.other.drainage-maintenance.details.soil-type-id'),
            field: 'soil_type_id',
            renderCell: ({ row }: CellType) => row.soilType?.title || t('common.not-available')
        },
        {
            flex: 0.15,
            minWidth: 140,
            headerName: t('project.other.drainage-maintenance.details.ground-water-impact-id'),
            field: 'ground_water_impact_id',
            renderCell: ({ row }: CellType) => row.groundWaterImpact?.title || t('common.not-available')
        },
        {
            flex: 0.12,
            minWidth: 130,
            headerName: t('project.other.drainage-maintenance.details.slope-stability-id'),
            field: 'slope_stability_id',
            renderCell: ({ row }: CellType) => row.slopeStability?.title || t('common.not-available')
        },
        {
            flex: 0.12,
            minWidth: 120,
            headerName: t('common.table-columns.created-at'),
            field: 'created_at',
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
            )
        },
        {
            minWidth: 150,
            sortable: false,
            field: 'actions',
            headerName: t('common.table-columns.actions'),
            renderCell: ({ row }: CellType) => (
                <Fragment>
                    <ModelAction
                        model="DrainageMaintenance"
                        model_id={row.id}
                        refetchModel={refetch}
                        resubmit={() => refetch()}
                        title=""
                        postAction={() => refetch()}
                    />
                    <RowOptions
                        onEdit={() => onEdit(row)}
                        onDelete={() => onDelete(row.id)}
                        item={row}
                        deletePermissionRule={{ action: 'delete', subject: 'drainagemaintenance' }}
                        editPermissionRule={{ action: 'update', subject: 'drainagemaintenance' }}
                        options={[]}
                    />
                </Fragment>
            )
        }
    ];
