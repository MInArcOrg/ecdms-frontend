import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Member from 'src/types/member/member';
import TeamMember from 'src/types/team/team-member';
import Position from 'src/types/department/position';
import MemberAutocomplete from 'src/views/member/members/list/member-selector';
import CustomSwitch from 'src/views/shared/form/custom-switch';

interface SmallTeamMemberFormProps {
  formik: FormikProps<TeamMember>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Member;
  positions: Position[];
}

const SmallTeamMemberForm: React.FC<SmallTeamMemberFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData, positions }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <MemberAutocomplete
        label={transl('member')}
        name="member_id"
        member={formik.values.member}
        sx={{ mb: 4 }}
        disabled={formik.values.id ? true : false}
      />

      <CustomSwitch label={transl('is-leader')} placeholder={transl('is-leader')} name="is_leader" size="sm" sx={{ mb: 2 }} />
    </>
  );
};
export default SmallTeamMemberForm;
