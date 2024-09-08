import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';
import subMenuItems from './(subMenuItems)';
import stakeholderApiService from 'src/services/stakeholders/stakeholder-service';
import StakeholderProfileSection from 'src/views/pages/stakeholders/details/stakeholder-info/project-profile-card';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';

function StakeholderGeneralInformation() {
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
          <StakeholderProfileSection stakeholder={stakeholderGeneralInformation?.payload} />
        </>
      )}
    </StakeholderLayout>
  );
}

StakeholderGeneralInformation.acl = {
  subject: 'stakeholderinfo',
  action: 'view_stakeholderinfo'
};

export default StakeholderGeneralInformation;
