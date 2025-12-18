import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectClaim } from 'src/types/project/project-claim';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: ProjectClaim;
}

export const projectClaimColumns = (
    onDetail: (projectClaim: ProjectClaim) => void,
    onEdit: (projectClaim: ProjectClaim) => void,
    onDelete: (id: string) => void,
    t: any
): GridColDef[] => [
        {
            flex: 0.2,
            minWidth: 200,
            field: 'title',
            headerName: t('project.navigation.submenu.reporting.report.claim-title'),
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
                    {row.title}
                </Typography>
            )
        },
        {
            flex: 0.2,
            minWidth: 200,
            field: 'description',
            headerName: t('project.navigation.submenu.reporting.report.claim-description'),
            renderCell: ({ row }: CellType) => row.description
        },
        {
            flex: 0.15,
            minWidth: 120,
            field: 'created_at',
            headerName: t('common.created-at'),
            renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
        },
        {
            minWidth: 150,
            sortable: false,
            field: 'actions',
            headerName: t('common.table-columns.actions'),
            renderCell: ({ row }: CellType) => (
                <Fragment>
                    <RowOptions
                        onEdit={() => onEdit(row)}
                        onDelete={() => onDelete(row?.id || '')}
                        item={row}
                        deletePermissionRule={{
                            action: 'delete',
                            subject: 'claim'
                        }}
                        editPermissionRule={{
                            action: 'update',
                            subject: 'claim'
                        }}
                        options={[]}
                    />
                </Fragment>
            )
        }
    ];
