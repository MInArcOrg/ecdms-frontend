import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { paymentConstants } from 'src/constants/payment-constants';
import ProjectPaymentList from 'src/views/pages/projects/detail/project-finance/project-payment';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectAdvancePayment() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout activeMenu={1} activeSubMenu={6} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectPaymentList projectId={String(id)} type={paymentConstants.ADVANCE_PAYMENT.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectAdvancePayment.acl = {
  action: 'view_payment',
  subject: 'payment'
};
export default ProjectAdvancePayment;
