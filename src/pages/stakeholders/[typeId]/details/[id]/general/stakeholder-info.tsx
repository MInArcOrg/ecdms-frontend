import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import stakeholderInfoApiService from 'src/services/stakeholder/stakeholder-info-service';
import LoadingPlaceholder from 'src/views/components/loader';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderInfoDetailComponent from 'src/views/pages/stakeholders/details/stakeholder-info';
import subMenuItems from './(subMenuItems)';
import { StakeholderInfo } from 'src/types/stakeholder';

function StakeholderInformation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  const {
    data: stakeholderGeneralInformation,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['stakeholder-general-information', id],
    queryFn: () => stakeholderInfoApiService.getAll({
      filter: {
        stakeholder_id: id
      }
    })
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
          <StakeholderInfoDetailComponent
            stakeholder_id={id as string}
            refetch={refetch}
            stakeholderInfo={stakeholderGeneralInformation?.payload[0] as StakeholderInfo}
          />
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
