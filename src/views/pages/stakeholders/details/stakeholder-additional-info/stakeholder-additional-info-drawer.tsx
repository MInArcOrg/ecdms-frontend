import type { FormikProps } from "formik";
import type { IApiPayload } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import AdditionalInformationForm from "./stakeholder-additional-info-form";
import stakeholderAdditionalInformationApiService from "src/services/stakeholder/stakeholder-additional-information-service";
import type { StakeholderAdditionalInformation } from "src/types/stakeholder/stakeholder-additional-information";
import type { IApiResponse } from "src/types/requests";

interface AdditionalInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  additionalInfo: StakeholderAdditionalInformation;
  stakeholderId: string;
}

const AdditionalInformationDrawer = (
  props: AdditionalInformationDrawerType,
) => {
  const { open, toggle, refetch, additionalInfo, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    additional_information: yup
      .string()
      .required("Additional information is required"),
    reference: yup.string().max(255).nullable(),
  });

  const isEdit = Boolean(additionalInfo?.id);

  const createAdditionalInformation = async (
    body: IApiPayload<StakeholderAdditionalInformation>,
  ): Promise<IApiResponse<StakeholderAdditionalInformation>> => {
    return stakeholderAdditionalInformationApiService.create(body);
  };

  const editAdditionalInformation = async (
    body: IApiPayload<StakeholderAdditionalInformation>,
  ): Promise<IApiResponse<StakeholderAdditionalInformation>> => {
    return stakeholderAdditionalInformationApiService.update(
      additionalInfo?.id || "",
      body,
    );
  };

  const getPayload = (values: StakeholderAdditionalInformation) => ({
    data: {
      ...values,
      id: additionalInfo?.id,
      stakeholder_id: stakeholderId,
    },
    files: [],
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<StakeholderAdditionalInformation>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-additional-information.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {/* <CustomSideDrawer title={`stakeholderManager.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}></CustomSideDrawer> */}
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-additional-information.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(additionalInfo as StakeholderAdditionalInformation),
          }}
          createActionFunc={
            isEdit ? editAdditionalInformation : createAdditionalInformation
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderAdditionalInformation>) => (
            <AdditionalInformationForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AdditionalInformationDrawer;
