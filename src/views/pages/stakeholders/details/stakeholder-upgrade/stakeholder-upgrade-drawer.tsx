import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import UpgradeForm from './stakeholder-upgrade-form';
import stakeholderUpgradeApiService from 'src/services/stakeholder/stakeholder-upgrade-service';
import type { StakeholderUpgrade } from 'src/types/stakeholder/stakeholder-upgrade';
import type { IApiResponse } from 'src/types/requests';

interface UpgradeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  upgrade: StakeholderUpgrade;
  stakeholderId: string;
}

const UpgradeDrawer = (props: UpgradeDrawerType) => {
  const { open, toggle, refetch, upgrade, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    stakeholder_id: yup.string().required('Stakeholder is required'),
    upgrade_type_id: yup.string().required('Upgrade type is required'),
    previous_level: yup.string().required('Previous level is required'),
    upgraded_level: yup.string().required('Upgraded level is required'),
    description: yup.string().required('Description is required')
  });

  const isEdit = Boolean(upgrade?.id);

  const createUpgrade = async (body: IApiPayload<StakeholderUpgrade>): Promise<IApiResponse<StakeholderUpgrade>> => {
    return stakeholderUpgradeApiService.create(body);
  };

  const editUpgrade = async (body: IApiPayload<StakeholderUpgrade>): Promise<IApiResponse<StakeholderUpgrade>> => {
    return stakeholderUpgradeApiService.update(upgrade?.id || '', body);
  };

  const getPayload = (values: StakeholderUpgrade) => ({
    data: {
      ...values,
      id: upgrade?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderUpgrade>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-upgrade.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-upgrade.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            stakeholder_id: stakeholderId,
            upgrade_type_id: upgrade?.upgrade_type_id || '',
            previous_level: upgrade?.previous_level || '',
            upgraded_level: upgrade?.upgraded_level || '',
            ownership_percentage: upgrade?.ownership_percentage || undefined,
            description: upgrade?.description || ''
          }}
          createActionFunc={isEdit ? editUpgrade : createUpgrade}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderUpgrade>) => <UpgradeForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default UpgradeDrawer;
