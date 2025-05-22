import { Typography, Stack, Box, Divider, Grid } from '@mui/material';
import DataCollectionGuide from 'src/types/general/data-collection-guide';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

const DataCollectionGuideCard = ({
    dataCollectionGuide,
    onEdit,
    onDelete,
    refetch,
    t
}: {
    dataCollectionGuide: DataCollectionGuide & { id: string; created_at?: string };
    onEdit: (dataCollectionGuide: DataCollectionGuide & { id: string }) => void;
    onDelete: (id: string) => void;
    refetch: () => void;
    t: any;
}) => {
    return (
        <SharedItemViewCard
            createdAt={dataCollectionGuide.created_at}
            t={t}

            actions={
                <>
                    <FileDrawer id={dataCollectionGuide.id} type="DATA_COLLECTION_GUIDE" />
                    <ModelActionComponent
                        model="DataCollectionGuide"
                        model_id={dataCollectionGuide.id}
                        refetchModel={refetch}
                        resubmit={() => { }}
                        title=""
                        postAction={() => { }}
                    />
                    <RowOptions
                        onEdit={onEdit}
                        onDelete={() => onDelete(dataCollectionGuide.id)}
                        item={dataCollectionGuide}
                        deletePermissionRule={{ action: 'delete', subject: 'data-collection-guide' }}
                        editPermissionRule={{ action: 'update', subject: 'data-collection-guide' }}
                        options={[]}
                    />
                </>
            }
        >
            <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    {dataCollectionGuide.title || t('common.not-available')}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" color="text.primary">
                            {t('data-collection-guide.form.description')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dataCollectionGuide.description || t('common.not-available')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" color="text.primary">
                            {t('data-collection-guide.form.instruction')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dataCollectionGuide.instruction || t('common.not-available')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" color="text.primary">
                            {t('data-collection-guide.form.data_collection_frequency')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dataCollectionGuide.data_collection_frequency || t('common.not-available')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle2" color="text.primary">
                            {t('data-collection-guide.form.data_source')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dataCollectionGuide.data_source || t('common.not-available')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.primary">
                            {t('data-collection-guide.form.responsible_data_collector_body')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dataCollectionGuide.responsible_data_collector_body || t('common.not-available')}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </SharedItemViewCard>
    );
};

export default DataCollectionGuideCard;
