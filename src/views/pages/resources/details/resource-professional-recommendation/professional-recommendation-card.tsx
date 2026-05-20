import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ProfessionalRecommendation } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RecommendationCardProps {
    recommendation: ProfessionalRecommendation;
    refetch: () => void;
    onEdit: (recommendation: ProfessionalRecommendation) => void;
    onDelete: (id: string) => void;
    onDetail: (recommendation: ProfessionalRecommendation) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, refetch, onEdit, onDelete, onDetail }) => {
    const { t } = useTranslation();

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight="bold">
                        <Typography
                            noWrap
                            component={Button}
                            onClick={() => onDetail(recommendation)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            {recommendation.title || 'N/A'}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.recommendation.title')}: {recommendation?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.recommendation.description')}: {recommendation?.description || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.recommendation.file-type')}: {recommendation?.file_type || 'N/A'}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <FileDrawer id={recommendation?.id || ''} type={uploadableResourceFileTypes.resource} />
                <ModelAction
                    model="ProfessionalRecommendation"
                    model_id={recommendation?.id || ''}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    deletePermissionRule={{
                        action: 'delete',
                        subject: 'professionalrecommendation'
                    }}
                    editPermissionRule={{
                        action: 'update',
                        subject: 'professionalrecommendation'
                    }}
                    onEdit={() => onEdit(recommendation)}
                    onDelete={() => onDelete(recommendation?.id || '')}
                    item={recommendation}
                    options={[]}
                />
            </CardActions>
        </Card>
    );
};

export default RecommendationCard;
