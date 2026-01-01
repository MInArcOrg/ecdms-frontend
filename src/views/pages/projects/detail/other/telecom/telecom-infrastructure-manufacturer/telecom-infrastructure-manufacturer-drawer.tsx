'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TelecomInfrastructureManufacturerForm from './telecom-infrastructure-manufacturer-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { TelecomInfrastructureManufacturer, TelecomInfrastructure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface TelecomInfrastructureManufacturerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  telecomInfrastructures: TelecomInfrastructure[];
}

const TelecomInfrastructureManufacturerDrawer = (props: TelecomInfrastructureManufacturerDrawerType) => {
  const { open, toggle, refetch, telecomInfrastructureManufacturer, projectId, otherSubMenu, telecomInfrastructures } = props;

  const validationSchema = yup.object().shape({
    telecom_infrastructure_id: yup.string().required(),
    name: yup.string().required(),
    country: yup.string().nullable(),
    website: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(telecomInfrastructureManufacturer?.id);

  const createTelecomInfrastructureManufacturer = async (body: IApiPayload<TelecomInfrastructureManufacturer>) =>
    projectOtherApiSecondService<TelecomInfrastructureManufacturer>().create(otherSubMenu?.apiRoute || '', body);

  const editTelecomInfrastructureManufacturer = async (body: IApiPayload<TelecomInfrastructureManufacturer>) =>
    projectOtherApiSecondService<TelecomInfrastructureManufacturer>().update(
      otherSubMenu?.apiRoute || '',
      telecomInfrastructureManufacturer?.id || '',
      body
    );

  const getPayload = (values: TelecomInfrastructureManufacturer) => ({
    data: {
      project_id: projectId,
      telecom_infrastructure_id: values.telecom_infrastructure_id,
      name: values.name,
      country: values.country,
      website: values.website,
      remark: values.remark,
      id: telecomInfrastructureManufacturer?.id
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<TelecomInfrastructureManufacturer>,
    payload: IApiPayload<TelecomInfrastructureManufacturer>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.telecom-infrastructure-manufacturer.${
        isEdit ? `edit-telecom-infrastructure-manufacturer` : `create-telecom-infrastructure-manufacturer`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.telecom-infrastructure-manufacturer.${
            isEdit ? `edit-telecom-infrastructure-manufacturer` : `create-telecom-infrastructure-manufacturer`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...telecomInfrastructureManufacturer
          }}
          createActionFunc={isEdit ? editTelecomInfrastructureManufacturer : createTelecomInfrastructureManufacturer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TelecomInfrastructureManufacturer>) => {
            return (
              <TelecomInfrastructureManufacturerForm
                formik={formik}
                telecomInfrastructures={telecomInfrastructures}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TelecomInfrastructureManufacturerDrawer;
