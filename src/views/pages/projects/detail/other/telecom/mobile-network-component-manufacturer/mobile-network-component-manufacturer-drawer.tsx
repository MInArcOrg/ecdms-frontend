'use client';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ManufacturerOfMobileNetworkComponentForm from './mobile-network-component-manufacturer-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { TelecomInfrastructureComponent, ManufacturerOfMobileNetworkComponent } from 'src/types/project/other';

interface ManufacturerOfMobileNetworkComponentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  manufacturerOfMobileNetworkComponent: ManufacturerOfMobileNetworkComponent;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const ManufacturerOfMobileNetworkComponentDrawer = (props: ManufacturerOfMobileNetworkComponentDrawerType) => {
  const { open, toggle, refetch, manufacturerOfMobileNetworkComponent, projectId, otherSubMenu, telecomInfrastructureComponents, mobileNetworkTypeMap } = props;

  const validationSchema = yup.object().shape({
    mobile_network_id: yup.string().required(),
    cell: yup.string().nullable(),
    towers: yup.string().nullable(),
    antennas: yup.string().nullable(),
    base_stations: yup.string().nullable(),
    repeaters: yup.string().nullable(),
    switches: yup.string().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(manufacturerOfMobileNetworkComponent?.id);

  const createManufacturerOfMobileNetworkComponent = async (body: IApiPayload<ManufacturerOfMobileNetworkComponent>) =>
    projectOtherApiSecondService<ManufacturerOfMobileNetworkComponent>().create(otherSubMenu?.apiRoute || '', body);

  const editManufacturerOfMobileNetworkComponent = async (body: IApiPayload<ManufacturerOfMobileNetworkComponent>) =>
    projectOtherApiSecondService<ManufacturerOfMobileNetworkComponent>().update(
      otherSubMenu?.apiRoute || '',
      manufacturerOfMobileNetworkComponent?.id || '',
      body
    );

  const getPayload = (values: ManufacturerOfMobileNetworkComponent) => ({
    data: {
      project_id: projectId,
      mobile_network_id: values.mobile_network_id,
      cell: values.cell,
      towers: values.towers,
      antennas: values.antennas,
      base_stations: values.base_stations,
      repeaters: values.repeaters,
      switches: values.switches,
      others: values.others,
      id: manufacturerOfMobileNetworkComponent?.id
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ManufacturerOfMobileNetworkComponent>,
    payload: IApiPayload<ManufacturerOfMobileNetworkComponent>
  ) => {
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer
      title={`project.other.mobile-network-component-manufacturer.${isEdit ? `edit-mobile-network-component-manufacturer` : `create-mobile-network-component-manufacturer`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={manufacturerOfMobileNetworkComponent?.id || 'new'}
          edit={isEdit}
          title={`project.other.mobile-network-component-manufacturer.${isEdit ? `edit-mobile-network-component-manufacturer` : `create-mobile-network-component-manufacturer`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...manufacturerOfMobileNetworkComponent
          }}
          createActionFunc={isEdit ? editManufacturerOfMobileNetworkComponent : createManufacturerOfMobileNetworkComponent}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik) => (
            <ManufacturerOfMobileNetworkComponentForm
              formik={formik}
              telecomInfrastructureComponents={telecomInfrastructureComponents}
              mobileNetworkTypeMap={mobileNetworkTypeMap}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ManufacturerOfMobileNetworkComponentDrawer;
