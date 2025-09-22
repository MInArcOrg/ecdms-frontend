import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import DataCollectionGuideForm from "./data-collection-guide-form";
import DataCollectionGuide from "src/types/general/data-collection-guide";
import dataCollectionGuideApiService from "src/services/general/data-collection-guide-service";
import { IApiPayload } from "src/types/requests";

interface DataCollectionGuideDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dataCollectionGuide: DataCollectionGuide;
  model: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  instruction: yup.string(),
  data_collection_frequency: yup.string(),
  data_source: yup.string(),
  responsible_data_collector_body: yup.string(),
});

const DataCollectionGuideDrawer = (props: DataCollectionGuideDrawerType) => {
  // ** Props
  const { open, toggle, refetch, dataCollectionGuide } = props;

  const isEdit = dataCollectionGuide?.id ? true : false;

  const createDataCollectionGuide = async (
    body: IApiPayload<DataCollectionGuide>,
  ) => {
    return await dataCollectionGuideApiService.create(body);
  };
  const editDataCollectionGuide = async (
    body: IApiPayload<DataCollectionGuide>,
  ) => {
    return await dataCollectionGuideApiService.update(
      dataCollectionGuide?.id || "",
      body,
    );
  };

  const getPayload = (values: DataCollectionGuide) => {
    const payload = {
      data: {
        ...values,
        model: props.model,
        id: dataCollectionGuide?.id,
      },
      files: [],
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
      title={`data-collection-guide.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="data-collection-guide.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={dataCollectionGuide}
          createActionFunc={
            isEdit ? editDataCollectionGuide : createDataCollectionGuide
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DataCollectionGuide>) => {
            return (
              <DataCollectionGuideForm
                formik={formik}
                defaultLocaleData={{} as DataCollectionGuide}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DataCollectionGuideDrawer;
