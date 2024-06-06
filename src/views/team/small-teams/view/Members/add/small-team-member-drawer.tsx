import * as yup from 'yup';

import { FormikProps } from 'formik';
import usePosition from 'src/hooks/team/position-hook';
import useSmallTeam from 'src/hooks/team/small-team-hook';
import Member from 'src/types/member/member';
import TeamMember from 'src/types/team/team-member';
import SmallTeam from 'src/types/team/small-team';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import SmallTeamMemberForm from './small-team-member-form';

interface SmallTeamMemberDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  smallTeamMember: Member;
  smallTeam: SmallTeam;
}

const validationSchema = yup.object().shape({
  member_id: yup.string().required()
});

const SmallTeamMemberDrawer = (props: SmallTeamMemberDrawerType) => {
  // ** Props
  const { open, toggle, refetch, smallTeamMember, smallTeam } = props;

  const { assignSmallTeamMember, updateSmallTeamMember } = useSmallTeam() as ReturnType<typeof useSmallTeam>;
  const { allPositions } = usePosition(
    {
      pagination: {
        page: 1,
        pageSize: 100
      }
    },
    smallTeam.id
  ) as ReturnType<typeof usePosition>;

  const isEdit = smallTeamMember?.id ? true : false;

  const getPayload = (values: TeamMember) => {
    const payload = {
      data: {
        id: smallTeamMember?.id,
        is_leader: values.is_leader,
        team_id: smallTeam.id,
        member_id: values.member_id
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={isEdit ? 'edit-small-team-member' : 'create-small-team-member'} handleClose={handleClose} open={open}>
      {() =>
        smallTeamMember && (
          <FormPageWrapper
            edit={isEdit}
            title="small-team-member"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                ...smallTeamMember
              } as Member
            }
            createActionFunc={isEdit ? updateSmallTeamMember : assignSmallTeamMember}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<TeamMember>) => {
              return <SmallTeamMemberForm formik={formik} positions={allPositions} defaultLocaleData={{} as Member} />;
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SmallTeamMemberDrawer;
