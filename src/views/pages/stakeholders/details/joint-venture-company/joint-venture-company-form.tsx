import type React from 'react';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import jointVentureApiService from 'src/services/stakeholder/joint-venture-service';

interface JointVentureCompanyFormProps {
  formik: FormikProps<JointVentureCompany>;
  stakeholderId: string;
}

interface ApiResponse {
  payload: Array<{
    id: string;
    name: string;
    member_companies_no: number;
    description: string;
    reference: string;
  }>;
  _attributes: {
    pagination: {
      total: number;
    };
  };
}

const JointVentureCompanyForm: React.FC<JointVentureCompanyFormProps> = ({ formik, stakeholderId }) => {
  const { t } = useTranslation();
  const [jointVentures, setJointVentures] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchJointVentures = async () => {
      try {
        const response = await jointVentureApiService.getAll({ filter: { stakeholder_id: stakeholderId } });
        const apiResponse = response as ApiResponse;

        if (apiResponse?.payload && Array.isArray(apiResponse.payload)) {
          setJointVentures(
            apiResponse.payload.map((jv) => ({
              value: jv.id,
              label: jv.name
            }))
          );
        } else {
          console.error('Unexpected API response format:', apiResponse);
          setJointVentures([]);
        }
      } catch (error) {
        console.error('Error fetching joint ventures:', error);
        setJointVentures([]);
      }
    };

    fetchJointVentures();
  }, [stakeholderId]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholder.joint-venture-company.jointVenture')}
          name="joint_venture_id"
          options={jointVentures}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.joint-venture-company.companyName')} name="company_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.joint-venture-company.specialization')} name="specialization" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture-company.rolesAndResponsibilities')}
          name="roles_and_responsibilities"
          multiline
          rows={4}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          type="number"
          label={t('stakeholder.joint-venture-company.ownershipPercentage')}
          name="ownership_percentage"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture-company.description')}
          name="description"
          multiline
          rows={4}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.joint-venture-company.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default JointVentureCompanyForm;
