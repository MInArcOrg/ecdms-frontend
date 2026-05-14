import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import jointVentureApiService from 'src/services/stakeholder/joint-venture-service';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface JointVentureCompanyFormProps {
  formik: FormikProps<JointVentureCompany>;
  stakeholderId: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
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

const JointVentureCompanyForm: React.FC<JointVentureCompanyFormProps> = ({ formik, stakeholderId, onFileChange, file }) => {
  const { t } = useTranslation();
  const [jointVentures, setJointVentures] = useState<Array<{ id: string; name: string }>>([]);

  const jointVentureOptions = useMemo(() => {
    return jointVentures.map((jv) => ({ value: jv.name, label: jv.name }));
  }, [jointVentures]);

  const jointVentureIdByTitle = useMemo(() => {
    return jointVentures.reduce<Record<string, string>>((acc, jv) => {
      acc[jv.name] = jv.id;
      return acc;
    }, {});
  }, [jointVentures]);

  useEffect(() => {
    const fetchJointVentures = async () => {
      try {
        const response = await jointVentureApiService.getAll({
          filter: { stakeholder_id: stakeholderId }
        });
        const apiResponse = response as ApiResponse;

        if (apiResponse?.payload && Array.isArray(apiResponse.payload)) {
          setJointVentures(apiResponse.payload.map((jv) => ({ id: jv.id, name: jv.name })));
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

  useEffect(() => {
    if (!jointVentures.length) return;

    if (formik.values.title && !formik.values.joint_venture_id) {
      const id = jointVentureIdByTitle[formik.values.title];
      if (id) formik.setFieldValue('joint_venture_id', id, false);
    }

    if (formik.values.joint_venture_id && !formik.values.title) {
      const title = jointVentures.find((jv) => jv.id === formik.values.joint_venture_id)?.name;
      if (title) formik.setFieldValue('title', title, false);
    }
  }, [formik.values.joint_venture_id, formik.values.title, jointVentureIdByTitle, jointVentures]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture-company.title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture-company.companyName')}
          name="company_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture-company.specialization')}
          name="specialization"
          size="small"
          sx={{ mb: 2 }}
        />
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
      <Grid item xs={12}>
        <CustomFileUpload
          file={file}
          onFileChange={onFileChange}
          label={t('common.form.file-upload')}
        />
      </Grid>

    </Grid>
  );
};

export default JointVentureCompanyForm;
