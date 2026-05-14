import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { paymentConstants } from 'src/constants/payment-constants';
import ProjectPaymentList from 'src/views/pages/projects/detail/project-finance/project-payment';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectInterimPayment() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.resource}
        activeSubMenuId={projectResourceIds.finance.interimPayment}
        subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
      >
        {' '}
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
