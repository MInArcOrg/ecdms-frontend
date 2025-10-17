import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MobileNetworkForm from './mobile-network-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { MobileNetwork } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MobileNetworkDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  mobileNetwork: MobileNetwork;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const MobileNetworkDrawer = (props: MobileNetworkDrawerType) => {
  const { open, toggle, refetch, mobileNetwork, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    mobile_network_type_id: yup.string().uuid().required('Mobile network type is required'),
    cell_towers: yup.boolean().nullable(),
    antennas: yup.boolean().nullable(),
    base_stations: yup.boolean().nullable(),
    repeaters: yup.boolean().nullable(),
    switches: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(mobileNetwork?.id);

  const createMobileNetwork = async (body: IApiPayload<MobileNetwork>) =>
    projectOtherApiSecondService<MobileNetwork>().create(otherSubMenu?.apiRoute || '', body);

  const editMobileNetwork = async (body: IApiPayload<MobileNetwork>) =>
    projectOtherApiSecondService<MobileNetwork>().update(otherSubMenu?.apiRoute || '', mobileNetwork?.id || '', body);

  const getPayload = (values: MobileNetwork) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MobileNetwork>, payload: IApiPayload<MobileNetwork>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.mobileNetwork, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.mobile-network.${isEdit ? `edit-mobile-network` : `create-mobile-network`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mobile-network.${isEdit ? `edit-mobile-network` : `create-mobile-network`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...mobileNetwork,
            cell_towers: mobileNetwork?.cell_towers || false,
            antennas: mobileNetwork?.antennas || false,
            base_stations: mobileNetwork?.base_stations || false,
            repeaters: mobileNetwork?.repeaters || false,
            switches: mobileNetwork?.switches || false
          }}
          createActionFunc={isEdit ? editMobileNetwork : createMobileNetwork}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MobileNetwork>) => {
            return <MobileNetworkForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MobileNetworkDrawer;
