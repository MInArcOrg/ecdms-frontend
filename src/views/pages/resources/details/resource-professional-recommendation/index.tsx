import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalRecommendationApiService from 'src/services/resource/professional-recommendation-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { ProfessionalRecommendation } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import RecommendationCard from './professional-recommendation-card';
import RecommendationDrawer from './professional-recommendation-drawer';
import { recommendationColumns } from './professional-recommendation-row';

function ProfessionalRecommendationList({ professionalId }: { professionalId: string }) {
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ProfessionalRecommendation | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [detailItems, setDetailItems] = useState<{ title: string; value: string }[]>([]);
    const { t } = useTranslation();

    const fetchRecommendations = (params: GetRequestParam): Promise<IApiResponse<ProfessionalRecommendation[]>> => {
        return professionalRecommendationApiService.getAll({
            ...params,
            filter: {
                professional_id: professionalId
            }
        });
    };

    const {
        data: recommendations,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<ProfessionalRecommendation[]>({
        queryKey: ['professionalRecommendations', professionalId],
        fetchFunction: fetchRecommendations
    });

    const toggleDrawer = () => {
        setSelectedRow(null);
        setShowDrawer(!showDrawer);
    };

    const handleEdit = (recommendation: ProfessionalRecommendation) => {
        setSelectedRow(recommendation);
        setShowDrawer(true);
    };

    const handleDelete = async (recommendationId: string) => {
        await professionalRecommendationApiService.delete(recommendationId);
        refetch();
    };

    const mapRecommendationToDetailItems = (recommendation: ProfessionalRecommendation): { title: string; value: string }[] => [
        {
            title: t('resources.professional.recommendation.title'),
            value: recommendation.title || 'N/A'
        },
        {
            title: t('resources.professional.recommendation.description'),
            value: recommendation.description || 'N/A'
        },
        {
            title: t('resources.professional.recommendation.file-type'),
            value: recommendation.file_type || 'N/A'
        }
    ];

    const handleDetail = (recommendation: ProfessionalRecommendation) => {
        const items = mapRecommendationToDetailItems(recommendation);
        setDetailItems(items);
        setSidebarOpen(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            {showDrawer && (
                <RecommendationDrawer
                    open={showDrawer}
                    toggle={toggleDrawer}
                    professionalId={professionalId}
                    recommendation={selectedRow || undefined}
                    refetch={refetch}
                />
            )}

            {sidebarOpen && (
                <OtherDetailSidebar
                    open={sidebarOpen}
                    toggle={() => setSidebarOpen(!sidebarOpen)}
                    title={t('resources.professional.recommendation.title')}
                    items={detailItems}
                />
            )}

            <Container>
                <ItemsListing
                    pagination={pagination}
                    type={ITEMS_LISTING_TYPE.grid.value}
                    isLoading={isLoading}
                    ItemViewComponent={({ data }) => (
                        <RecommendationCard
                            recommendation={data}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onDetail={handleDetail}
                            refetch={refetch}
                        />
                    )}
                    createActionConfig={{
                        ...defaultCreateActionConfig,
                        onClick: toggleDrawer,
                        onlyIcon: false,
                        permission: {
                            action: 'create',
                            subject: 'professionalrecommendation'
                        }
                    }}
                    columns={recommendationColumns(handleDetail, handleEdit, handleDelete, t)}
                    fetchDataFunction={refetch}
                    items={recommendations || []}
                    onPaginationChange={handlePageChange}
                />
            </Container>
        </Box>
    );
}

export default ProfessionalRecommendationList;
