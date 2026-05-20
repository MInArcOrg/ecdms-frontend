'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalLicense } from 'src/types/resource';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: ProfessionalLicense;
}

export const professionalLicenseColumns = (
    onDetail: (item: ProfessionalLicense) => void,
    onEdit: (item: ProfessionalLicense) => void,
    onDelete: (id: string) => void,
    t: any
): GridColDef[] => [
        {
            flex: 0.2,
            minWidth: 200,
            field: 'license_name',
            headerName: t('resources.professional.license.license-name'),
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
                    {row.license_name || t('common.not-available')}
                </Typography>
            )
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'license_number',
            headerName: t('resources.professional.license.license-number'),
            renderCell: ({ row }: CellType) => row.license_number || t('common.not-available')
        },
        {
            flex: 0.15,
            minWidth: 140,
            field: 'license_type_id',
            headerName: t('resources.professional.license.license-type'),
            renderCell: ({ row }: CellType) => row.licenseType?.title || t('common.not-available')
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'license_category_id',
            headerName: t('resources.professional.license.license-category'),
            renderCell: ({ row }: CellType) => row.licenseCategory?.title || t('common.not-available')
        },
        {
            flex: 0.12,
            minWidth: 110,
            field: 'issue_date',
            headerName: t('resources.professional.license.issue-date'),
            renderCell: ({ row }: CellType) => formatDynamicDate(row.issue_date) || t('common.not-available')
        },
        {
            flex: 0.12,
            minWidth: 110,
            field: 'expire_date',
            headerName: t('resources.professional.license.expire-date'),
            renderCell: ({ row }: CellType) => formatDynamicDate(row.expire_date) || t('common.not-available')
        },
        {
            flex: 0.12,
            minWidth: 120,
            field: 'created_at',
            headerName: t('common.created-at'),
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at || '')}</Typography>
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
                        model="ProfessionalLicense"
                        model_id={row.id || ''}
                        refetchModel={() => { }}
                        resubmit={() => { }}
                        title=""
                        postAction={() => { }}
                    />
                    <RowOptions
                        onEdit={() => onEdit(row)}
                        onDelete={() => onDelete(row.id || '')}
                        item={row}
                        deletePermissionRule={{ action: 'delete', subject: 'professionallicense' }}
                        editPermissionRule={{ action: 'update', subject: 'professionallicense' }}
                        options={[]}
                    />
                </Fragment>
            )
        }
    ];
