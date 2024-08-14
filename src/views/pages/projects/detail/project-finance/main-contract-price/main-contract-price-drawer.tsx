import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import MainContractPriceForm from './main-contract-price-form'; // Import your project form component
import { IApiPayload } from 'src/types/requests';
import { ProjectFinance } from 'src/types/project';
import projectFinanceApiService from 'src/services/project/project-finance-service';

interface MainContractPriceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectFinance: ProjectFinance;
  projectId: string;
}

const validationSchema = yup.object().shape({
  main_contract_price_amount: yup.number().required(),
  rebate: yup.number().required()
});

const MainContractPriceDrawer = (props: MainContractPriceDrawerType) => {
  // ** Props
  const { open, toggle, refetch, projectFinance, projectId } = props;

  const isEdit = projectFinance?.id ? true : false;

  const createMainContractPrice = async (body: IApiPayload<ProjectFinance>) => {
    return await projectFinanceApiService.create(body);
  };

  const editMainContractPrice = async (body: IApiPayload<ProjectFinance>) => {
    return await projectFinanceApiService.update(projectFinance?.id || '', body);
  };

  const getPayload = (values: ProjectFinance) => {
    const payload = {
      data: {
        ...values,
        id: projectFinance?.id,
        project_id: projectId
      },
      files: [] // Adjust if you need to handle files
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.main-contract-price.${isEdit ? 'edit-main-contract-price' : 'create-main-contract-price'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.main-contract-price.title" // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(projectFinance as ProjectFinance) }}
          createActionFunc={isEdit ? editMainContractPrice : createMainContractPrice}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectFinance>) => {
            return <MainContractPriceForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MainContractPriceDrawer;
