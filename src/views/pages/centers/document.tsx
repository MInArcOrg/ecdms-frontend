import { Icon } from '@iconify/react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import type { FormikProps } from 'formik';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import Can from 'src/layouts/components/acl/Can';
import centerDocumentApiService from 'src/services/department/center-document-service';
import type CenterDocument from 'src/types/department/center-document';
import type Department from 'src/types/department/department';
import type { IApiPayload } from 'src/types/requests';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { formatCreatedAt } from 'src/utils/formatter/date';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import ItemsListing from 'src/views/shared/listing';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  department_id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().nullable(),
  file_type: yup.string().nullable()
});

const fileTypeOptions = [
  { value: 'policy', label: 'Policy' },
  { value: 'directive', label: 'Directive' },
  { value: 'guideline', label: 'Guideline' },
  { value: 'manual', label: 'Manual' },
  { value: 'template', label: 'Template' },
  { value: 'report', label: 'Report' },
  { value: 'memo', label: 'Memo' },
  { value: 'letter', label: 'Letter' },
  { value: 'contract', label: 'Contract' },
  { value: 'other', label: 'Other' }
];

function CenterDocuments({ parentDepartment }: { parentDepartment: Department }) {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<CenterDocument | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CenterDocument | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fetchCenterDocuments = (params: any) =>
    centerDocumentApiService.getAll({
      ...params,
      filter: {
        ...(params?.filter || {}),
        department_id: parentDepartment.id
      }
    });

  const {
    data: centerDocuments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<CenterDocument[]>({
    queryKey: ['center-documents', parentDepartment?.id],
    fetchFunction: fetchCenterDocuments
  });

  const handleCreate = () => {
    setSelectedDocument({ department_id: parentDepartment.id } as CenterDocument);
    setShowDrawer(true);
  };

  const handleEdit = (centerDocument: CenterDocument) => {
    setSelectedDocument(centerDocument);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelectedDocument(null);
    setFile(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await centerDocumentApiService.delete(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  const columns = useMemo(() => {
    return [
      {
        flex: 0.2,
        minWidth: 160,
        headerName: t('Name'),
        field: 'title',
        renderCell: ({ row }: { row: CenterDocument }) => (
          <Typography sx={{ color: 'text.secondary' }}>{row?.title}</Typography>
        )
      },
      {
        flex: 0.35,
        minWidth: 220,
        headerName: t('Description'),
        field: 'description',
        renderCell: ({ row }: { row: CenterDocument }) => (
          <Typography sx={{ color: 'text.secondary' }}>{row?.description || '-'}</Typography>
        )
      },
      {
        flex: 0.15,
        minWidth: 140,
        headerName: t('File Type'),
        field: 'file_type',
        renderCell: ({ row }: { row: CenterDocument }) => (
          <Typography sx={{ color: 'text.secondary' }}>{row?.file_type || '-'}</Typography>
        )
      },
      {
        flex: 0.15,
        minWidth: 140,
        headerName: t('Created At'),
        field: 'created_at',
        renderCell: ({ row }: { row: CenterDocument }) => (
          <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : '-'}</Typography>
        )
      },
      {
        flex: 0.15,
        minWidth: 140,
        sortable: false,
        field: 'actions',
        headerName: t('Action'),
        renderCell: ({ row }: { row: CenterDocument }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Can do="update" on="department">
              <IconButton size="small" onClick={() => handleEdit(row)}>
                <Icon icon="tabler:edit" fontSize={18} />
              </IconButton>
            </Can>
            <Can do="delete" on="department">
              <IconButton
                size="small"
                onClick={() => {
                  setDeleteTarget(row);
                }}
              >
                <Icon icon="tabler:trash" fontSize={18} />
              </IconButton>
            </Can>
          </Box>
        )
      }
    ] as GridColDef[];
  }, [t, parentDepartment?.id]);

  const isEdit = Boolean(selectedDocument?.id);

  const createCenterDocument = async (body: IApiPayload<CenterDocument>) => centerDocumentApiService.create(body);
  const editCenterDocument = async (body: IApiPayload<CenterDocument>) =>
    centerDocumentApiService.update(selectedDocument?.id || '', body);

  const getPayload = (values: CenterDocument) => {
    const data: any = {
      ...values,
      department_id: parentDepartment.id
    };

    if (selectedDocument?.id) data.id = selectedDocument.id;

    return {
      data,
      files: file ? [{ type: 'DOCUMENT', file }] : []
    };
  };

  const onActionSuccess = () => {
    handleCloseDrawer();
    refetch();
  };

  return (
    <Fragment>
      {showDrawer && (
        <CustomSideDrawer
          translatedTitle={isEdit ? 'Edit Center Document' : 'Create Center Document'}
          open={showDrawer}
          handleClose={handleCloseDrawer}
        >
          {() => (
            <FormPageWrapper
              edit={isEdit}
              title="Center Document"
              getPayload={getPayload}
              validationSchema={validationSchema}
              initialValues={(selectedDocument || { department_id: parentDepartment.id } as CenterDocument) as CenterDocument}
              createActionFunc={isEdit ? editCenterDocument : createCenterDocument}
              onActionSuccess={onActionSuccess}
              onCancel={handleCloseDrawer}
              showTitle={false}
            >
              {(_formik: FormikProps<CenterDocument>) => (
                <>
                  <CustomTextBox
                    fullWidth
                    label={t('Title')}
                    placeholder={t('Title')}
                    name="title"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <CustomTextBox
                    fullWidth
                    label={t('Description')}
                    placeholder={t('Description')}
                    name="description"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />
                  <CustomSelectBox
                    fullWidth
                    label={t('File Type')}
                    placeholder={t('File Type')}
                    name="file_type"
                    size="small"
                    options={fileTypeOptions}
                    sx={{ mb: 2 }}
                  />
                  <CustomFileUpload file={file} onFileChange={setFile} label={t('common.form.file-upload')} />
                </>
              )}
            </FormPageWrapper>
          )}
        </CustomSideDrawer>
      )}

      <DeleteConfirmationDialog
        open={Boolean(deleteTarget)}
        handleClose={() => setDeleteTarget(null)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          fetchDataFunction={refetch}
          title="Center Documents"
          tableProps={{
            headers: columns
          }}
          items={centerDocuments || []}
          onPaginationChange={handlePageChange}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: handleCreate,
            onlyIcon: false,
            permission: { action: 'create', subject: 'department' }
          }}
        />
      </Container>
    </Fragment>
  );
}

export default CenterDocuments;
