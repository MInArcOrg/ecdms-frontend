import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
    row: StakeholderAccreditation;
}

export const stakeholderAccreditationColumns = (
    onDetail: (accreditation: StakeholderAccreditation) => void,
    onEdit: (accreditation: StakeholderAccreditation) => void,
    onDelete: (id: string) => void,
    t: any,
    refetch: () => void
): GridColDef[] => [
        {
            flex: 0.15,
            minWidth: 120,
            field: 'id',
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
                    {t('common.table-columns.details')}
                </Typography>
            )
        },
        {
            flex: 0.15,
            minWidth: 150,
            headerName: t('stakeholder.stakeholder-accreditation.form.title'),
            field: 'title',
            renderCell: ({ row }: CellType) => (row?.title ? row.title : t('common.not-available'))
        },

        {
            flex: 0.15,
            minWidth: 200,
            headerName: t('stakeholder.stakeholder-accreditation.form.description'),
            field: 'description',
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: 'text.secondary' }}>{row?.description ? row.description : t('common.not-available')}</Typography>
            )
        },
        {
            flex: 0.15,
            minWidth: 120,
            headerName: t('common.table-columns.created-at'),
            field: 'created_at',
            renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at as Date)}</Typography>
        },
        {
            flex: 0.15,
            minWidth: 120,
            headerName: t('common.table-columns.files'),
            field: 'file',
            renderCell: ({ row }: CellType) => <FileDrawer type={uploadableStakeholderFileTypes.stakeholderAccreditation} id={row.id} />
        },
        {
            minWidth: 150,
            sortable: false,
            field: 'actions',
            headerName: t('common.table-columns.actions'),
            renderCell: ({ row }: CellType) => (
                <Fragment>
                    <ModelAction
                        model="StakeholderAccreditation"
                        model_id={row.id}
                        refetchModel={refetch}
                        resubmit={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                        title=""
                        postAction={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                    <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} options={[]}
                        deletePermissionRule={{
                            action: 'delete',
                            subject: 'stakeholderaccreditation'
                        }}
                        editPermissionRule={{
                            action: 'update',
                            subject: 'stakeholderaccreditation'
                        }}
                    />
                </Fragment>
            )
        }
    ];
