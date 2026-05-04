import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderCertificate;
}

export const stakeholderCertificateColumns = (
  onDetail: (stakeholderCertificate: StakeholderCertificate) => void,
  onEdit: (stakeholderCertificate: StakeholderCertificate) => void,
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
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.title'),
      field: 'title',
      renderCell: ({ row }: CellType) => (row?.title ? row.title : t('common.not-available'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.type'),
      field: 'type',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.type ? row.type : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.certification-number'),
      field: 'certification_number',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.certification_number ? row.certification_number : t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.scope'),
      field: 'scope',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.scope ? row.scope : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.certifying-body'),
      field: 'certifying_body',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.certifying_body ? row.certifying_body : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.issue-date'),
      field: 'issue_date',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.issue_date ? formatDynamicDate(row.issue_date) : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.expire-date'),
      field: 'expire_date',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.expire_date ? formatDynamicDate(row.expire_date) : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.stakeholder-certificate.form.remark'),
      field: 'remark',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.remark ? row.remark : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.files'),
      field: 'file',
      renderCell: ({ row }: CellType) => <FileDrawer type={uploadableStakeholderFileTypes.stakeholderCertificate} id={row.id} />
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="StakeholderCertificate"
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
          <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} options={[]} />
        </Fragment>
      )
    }
  ];
