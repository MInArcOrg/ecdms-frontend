import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(subMenuItems)';

function ProjectLocation() {
    // states / hooks / variables
    const router = useRouter();
    const { id, typeId } = router.query;

    return (
        <Box>
            <StakeholderLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
                {/* <AddressList modelId={String(id)} /> */}
            </StakeholderLayout>
        </Box>
    );
}

ProjectLocation.acl = {
    subject: 'projectinfo',
    action: 'view_projectinfo'
};

export default ProjectLocation;
