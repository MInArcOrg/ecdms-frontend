/* eslint-disable prettier/prettier */

import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import { IApiPayload } from "src/types/requests";
import { Stakeholders } from "src/types/stakeholders";
import stakeholdersApiService from "src/services/stakeholders/stakeholders-service";
import StakeholdersForm from "./stakeholders-form";

interface StakeholdersDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholders: Stakeholders;
  typeId: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  stakeholdercategory_id: yup.string().required(),
  stakeholdersubcategory_id: yup.string(),
});

const StakeholdersDrawer = (props: StakeholdersDrawerType) => {
  // ** Props
  const { open, toggle, refetch, stakeholders, typeId } = props;

  const isEdit = stakeholders?.id ? true : false;
  const createResource = async (body: IApiPayload<Stakeholders>) => {
    return await stakeholdersApiService.create(body);
  };
  const editResource = async (body: IApiPayload<Stakeholders>) => {
    return await stakeholdersApiService.update(stakeholders?.id || "", body);
  };

  const getPayload = (values: Stakeholders) => {
    const payload = {
      data: {
        ...values,
        id: stakeholders?.id,
        stakeholdertype_id: typeId,
      },
      files: [],
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
    <CustomSideDrawer
      title={`stakeholders.${
        isEdit ? "edit-stakeholders" : "create-stakeholders"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={stakeholders as Stakeholders}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Stakeholders>) => {
            return <StakeholdersForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholdersDrawer;
