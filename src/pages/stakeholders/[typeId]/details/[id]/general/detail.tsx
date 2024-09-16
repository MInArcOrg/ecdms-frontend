import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';
import subMenuItems from './(subMenuItems)';
import stakeholderApiService from 'src/services/stakeholder/stakeholder-service';
import StakeholderDetailComponent from 'src/views/pages/stakeholders/details/stakeholder-detail';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';

function StakeholderDetail() {
  const router = useRouter();
  const { id, typeId } = router.query;

  const {
    data: stakeholderGeneralInformation,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['stakeholder-general-information', id],
    queryFn: () => stakeholderApiService.getOne(String(id), {})
  });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  return (
    <StakeholderLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <StakeholderDetailComponent typeId={typeId as string} refetch={refetch} stakeholder={stakeholderGeneralInformation?.payload} />
        </>
      )}
    </StakeholderLayout>
  );
}

StakeholderDetail.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default StakeholderDetail;
