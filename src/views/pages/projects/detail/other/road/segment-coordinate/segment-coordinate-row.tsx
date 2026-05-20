'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { SegmentCoordinate } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: SegmentCoordinate;
}

export const segmentCoordinateColumns = (
    onDetail: (item: SegmentCoordinate) => void,
    onEdit: (item: SegmentCoordinate) => void,
    onDelete: (id: string) => void,
    t: any,
    refetch: () => void
): GridColDef[] => [
        {
            flex: 0.2,
            minWidth: 150,
            headerName: t('project.other.segment-coordinate.details.road-segment-id'),
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
            flex: 0.1,
            minWidth: 100,
            headerName: t('project.other.segment-coordinate.details.start-x'),
            field: 'start_x',
            renderCell: ({ row }: CellType) => row.start_x ?? t('common.not-available')
        },
        {
            flex: 0.1,
            minWidth: 100,
            headerName: t('project.other.segment-coordinate.details.start-y'),
            field: 'start_y',
            renderCell: ({ row }: CellType) => row.start_y ?? t('common.not-available')
        },
        {
            flex: 0.1,
            minWidth: 100,
            headerName: t('project.other.segment-coordinate.details.end-x'),
            field: 'end_x',
            renderCell: ({ row }: CellType) => row.end_x ?? t('common.not-available')
        },
        {
            flex: 0.1,
            minWidth: 100,
            headerName: t('project.other.segment-coordinate.details.end-y'),
            field: 'end_y',
            renderCell: ({ row }: CellType) => row.end_y ?? t('common.not-available')
        },
        {
            flex: 0.15,
            minWidth: 130,
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
                        model="SegmentCoordinate"
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
                        deletePermissionRule={{ action: 'delete', subject: 'segmentcoordinate' }}
                        editPermissionRule={{ action: 'update', subject: 'segmentcoordinate' }}
                        options={[]}
                    />
                </Fragment>
            )
        }
    ];
