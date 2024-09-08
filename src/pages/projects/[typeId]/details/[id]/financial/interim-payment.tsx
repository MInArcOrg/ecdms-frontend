import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { paymentConstants } from 'src/constants/payment-constants';
import ProjectPaymentList from 'src/views/pages/projects/detail/project-finance/project-payment';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectInterimPayment() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout activeMenu={1} activeSubMenu={5} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectPaymentList projectId={String(id)} type={paymentConstants.INTERIM_PAYMENT.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectInterimPayment.acl = {
  action: 'view',
  subject: 'payment'
};
export default ProjectInterimPayment;
