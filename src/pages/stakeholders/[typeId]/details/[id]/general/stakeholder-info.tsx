import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import stakeholderApiService from 'src/services/stakeholders/stakeholder-service';
import LoadingPlaceholder from 'src/views/components/loader';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderInfoDetailComponent from 'src/views/pages/stakeholders/details/stakeholder-info';
import subMenuItems from './(subMenuItems)';
import stakeholderInfoApiService from 'src/services/stakeholders/stakeholder-info-service';

function StakeholderInformation() {
    const router = useRouter();
    const { id, typeId } = router.query;

    const {
        data: stakeholderGeneralInformation,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['stakeholder-general-information', id],
        queryFn: () => stakeholderInfoApiService.getOne(String(id), {})
    });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    return (
        <StakeholderLayout activeMenu={0} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
            {isLoading ? (
                <LoadingPlaceholder />
            ) : (
                <>
                    <StakeholderInfoDetailComponent typeId={typeId as string} refetch={refetch} stakeholderInfo={stakeholderGeneralInformation?.payload} />
                </>
            )}
        </StakeholderLayout>
    );
}

StakeholderInformation.acl = {
    subject: 'stakeholderinfo',
    action: 'view_stakeholderinfo'
};

export default StakeholderInformation;
