import type { FormikProps } from "formik";
import projectFinanceApiService from "src/services/project/project-finance-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { ProjectFinance } from "src/types/project";
import type { ProjectGeneralFinance } from "src/types/project/project-finance";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import MainContractPriceForm from "./main-contract-price-form";

interface MainContractPriceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectFinance: ProjectFinance;
  projectId: string;
  projectGeneralFinance: ProjectGeneralFinance;
}

const MainContractPriceDrawer = (props: MainContractPriceDrawerProps) => {
  const {
    open,
    toggle,
    refetch,
    projectFinance,
    projectId,
    projectGeneralFinance,
  } = props;
   
  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    main_contract_price_amount: yup.number().nullable(),
    rebate: yup.number().nullable(),
    remark: yup.string().nullable(),
    source_of_finance: yup.string().max(255).nullable(),
    revision_no: yup.number().integer().nullable(),
  });

  const isEdit = Boolean(projectFinance?.id);

  const createMainContractPrice = async (body: IApiPayload<ProjectFinance>) =>
    projectFinanceApiService.create(body);

  const editMainContractPrice = async (body: IApiPayload<ProjectFinance>) =>
    projectFinanceApiService.update(projectFinance?.id || "", body);

  const getPayload = (values: ProjectFinance) => ({
    data: {
      ...values,
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ProjectFinance>,
    payload: IApiPayload<ProjectFinance>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.project,
        response.payload.id,
        "",
        "",
      );
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.main-contract-price.${
        isEdit ? "edit-main-contract-price" : "create-main-contract-price"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.main-contract-price.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={
            projectFinance || {
              project_id: projectId,
              main_contract_price_amount: 0,
              rebate: 0,
              source_of_finance: "",
              price_after_rebate: 0,
            }
          }
          createActionFunc={
            isEdit ? editMainContractPrice : createMainContractPrice
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectFinance>) => (
            <MainContractPriceForm
              formik={formik}
              projectGeneralFinance={projectGeneralFinance}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MainContractPriceDrawer;
