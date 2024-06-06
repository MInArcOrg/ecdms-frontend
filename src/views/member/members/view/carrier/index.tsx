import { Grid } from '@mui/material';
import { gridSpacing } from 'src/configs/app-constants';
import Member from 'src/types/member/member';
import AcademicInformationComponent from './academic-information';
import ProfessionalStatusComponent from './professional-status';
import Page from 'src/views/components/page/page';

const CarrierComponent = ({ member }: { member: Member }) => {
  return (
    <Page titleId="member-professional-status">
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <AcademicInformationComponent member={member} />
          <ProfessionalStatusComponent member={member} />
        </Grid>
      </Grid>
    </Page>
  );
};
export default CarrierComponent;
