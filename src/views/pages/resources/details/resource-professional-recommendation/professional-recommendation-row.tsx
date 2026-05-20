import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalRecommendation } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: ProfessionalRecommendation;
}

export const recommendationColumns = (
    onDetail: (recommendation: ProfessionalRecommendation) => void,
    onEdit: (recommendation: ProfessionalRecommendation) => void,
    onDelete: (id: string) => void,
    t: any
): GridColDef[] => [
        {
            flex: 0.2,
            minWidth: 200,
            field: 'title',
            headerName: t('resources.professional.recommendation.title'),
            renderCell: ({ row }: CellType) => {
                return (
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
                        {row.title || t('common.not-available')}
                    </Typography>
                );
            }
        },
        {
            flex: 0.2,
            minWidth: 200,
            field: 'description',
            headerName: t('resources.professional.recommendation.description'),
            renderCell: ({ row }: CellType) => row.description || t('common.not-available')
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'file_type',
            headerName: t('resources.professional.recommendation.file-type'),
            renderCell: ({ row }: CellType) => row.file_type || t('common.not-available')
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
                    <ModelAction
                        model="ProfessionalRecommendation"
                        model_id={row?.id || ''}
                        refetchModel={() => { }}
                        resubmit={() => { }}
                        title=""
                        postAction={() => { }}
                    />
                    <RowOptions
                        onEdit={() => onEdit(row)}
                        onDelete={() => onDelete(row?.id || '')}
                        item={row}
                        deletePermissionRule={{
                            action: 'delete',
                            subject: 'professionalrecommendation'
                        }}
                        editPermissionRule={{
                            action: 'update',
                            subject: 'professionalrecommendation'
                        }}
                        options={[]}
                    />
                </Fragment>
            )
        }
    ];
