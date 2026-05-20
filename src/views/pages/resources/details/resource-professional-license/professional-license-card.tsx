'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProfessionalLicense } from 'src/types/resource';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProfessionalLicenseCardProps {
    license: ProfessionalLicense;
    refetch: () => void;
    onEdit: (item: ProfessionalLicense) => void;
    onDelete: (id: string) => void;
    onDetail: (item: ProfessionalLicense) => void;
}

const ProfessionalLicenseCard: React.FC<ProfessionalLicenseCardProps> = ({ license, refetch, onEdit, onDelete, onDetail }) => {
    const { t } = useTranslation();

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight="bold">
                        <Typography
                            noWrap
                            component={Button}
                            onClick={() => onDetail(license)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            {license.license_name || license.id?.slice(0, 8) + '...'}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.license.license-number')}: {license.license_number || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.license.license-type')}: {license.licenseType?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.license.license-category')}: {license.licenseCategory?.title || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.license.issue-date')}: {formatDynamicDate(license.issue_date) || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('resources.professional.license.expire-date')}: {formatDynamicDate(license.expire_date) || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('common.created-at')}: {license.created_at ? formatCreatedAt(license.created_at) : 'N/A'}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <ModelAction
                    model="ProfessionalLicense"
                    model_id={license.id || ''}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    onEdit={() => onEdit(license)}
                    onDelete={() => onDelete(license.id || '')}
                    item={license}
                    deletePermissionRule={{ action: 'delete', subject: 'professionallicense' }}
                    editPermissionRule={{ action: 'update', subject: 'professionallicense' }}
                    options={[]}
                />
            </CardActions>
        </Card>
    );
};

export default ProfessionalLicenseCard;
