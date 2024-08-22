/* eslint-disable prettier/prettier */

import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import { IApiPayload } from "src/types/requests";
import StakeholderForm from "./stakeholder-form";
import { Stakeholder } from "src/types/stakeholder";
import stakeholderApiService from "src/services/stakeholders/stakeholder-service";

interface StakeholderDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholder: Stakeholder;
  typeId: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  stakeholdercategory_id: yup.string().required(),
  stakeholderubcategory_id: yup.string(),
});

const StakeholderDrawer = (props: StakeholderDrawerType) => {
  // ** Props
  const { open, toggle, refetch, stakeholder, typeId } = props;

  const isEdit = stakeholder?.id ? true : false;
  const createResource = async (body: IApiPayload<Stakeholder>) => {
    return await stakeholderApiService.create(body);
  };
  const editResource = async (body: IApiPayload<Stakeholder>) => {
    return await stakeholderApiService.update(stakeholder?.id || "", body);
  };

  const getPayload = (values: Stakeholder) => {
    const payload = {
      data: {
        ...values,
        id: stakeholder?.id,
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
      title={`stakeholder.${
        isEdit ? "edit-stakeholder" : "create-stakeholder"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={stakeholder as Stakeholder}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Stakeholder>) => {
            return <StakeholderForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderDrawer;
