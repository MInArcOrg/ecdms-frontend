/* eslint-disable prettier/prettier */

import * as yup from "yup";
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';

import { FormikProps } from "formik";
import moment from "moment";
import { useState } from "react";
import i18n from "src/configs/i18n";
import stakeholderEmailApiService from "src/services/stakeholder/stakeholder-email-service";
import stakeholderPhoneApiService from "src/services/stakeholder/stakeholder-phone-service";
import stakeholderApiService from "src/services/stakeholder/stakeholder-service";
import { uploadableStakeholderFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import {
  Stakeholder,
  StakeholderEmail,
  StakeholderPhone,
} from "src/types/stakeholder";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import StakeholderForm from "./stakeholder-form";
import { convertDateToLocaleDate } from "src/utils/formatter/date";
import { MasterType } from "src/types/master/master-types";
import { useTranslation } from "react-i18next";

interface StakeholderDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholder: Stakeholder;
  typeId: string;
  type?: MasterType
}

const validationSchema = yup.object().shape({
  stakeholdercategory_id: yup.string().max(36).required("Category is required"),
  stakeholdersubcategory_id: yup.string().max(36).nullable(),
  trade_name: yup.string().max(255).required("Trade Name is required"),
  tin: yup
    .string()
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\d+$/, { message: "TIN must contain only numbers", excludeEmptyString: true })
    .test("tin-length", "TIN must be exactly 10 digits", (value) => !value || value.length === 10),
  origin: yup.string().max(255).required("Origin is required"),
  license_issued_date: yup
    .string()
    .nullable()
    .test("not-future", "Issued date cannot be in the future", (value) => {
      if (!value) return true; // allow null
      const selected = new Date(value);
      const today = new Date();

      // Remove time portion to compare only the date
      selected.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return selected <= today;
    }),
  license_number: yup
    .string()
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^[A-Za-z0-9/#*_]+$/, "License Number can only contain letters, numbers, /, #, *, _"),

  ownership_id: yup.string().max(36).required("Ownership is required"),
  businessfield_id: yup.string().max(36).nullable(),
  revision_no: nullableIntegerSchema(),
});

const StakeholderDrawer = (props: StakeholderDrawerType) => {
  // ** Props
  const { open, toggle, refetch, stakeholder, typeId, type } = props;

  const { t } = useTranslation();
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

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
        tin: values.tin ? values.tin : null,
        license_issued_date: convertDateToLocaleDate(
          values.license_issued_date,
        ),
        license_number: values.license_number || null,
      },
      files: uploadableFile ? [uploadableFile] : [],
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = async (
    response: IApiResponse<Stakeholder>,
    payload: IApiPayload<Stakeholder>,
  ) => {
    // Handle file upload if there are files present
       if (payload.files.length > 0) {
          await uploadFile(payload.files[0],uploadableStakeholderFileTypes.stakeholder, response.payload.id, '', '');
        }

    // Submit stakeholder phones and emails
    const { stakeholderemails, stakeholderphones } = payload.data;
    // Assuming you have a function to update or submit stakeholder's phones and emails
    const emailsToSubmit = (stakeholderemails || [])
      .filter((e: any) => String(e?.email || "").trim().length > 0)
      .slice(0, 1);
    const phonesToSubmit = (stakeholderphones || [])
      .filter((p: any) => String(p?.phone || "").trim().length > 0)
      .slice(0, 2);

    if (emailsToSubmit.length > 0) {
      await submitStakeholderEmails(response.payload.id, emailsToSubmit);
    }

    if (phonesToSubmit.length > 0) {
      await submitStakeholderPhones(response.payload.id, phonesToSubmit);
    }

    // Refetch data and close the form/modal
    refetch();
    handleClose();
  };

  // Function to submit stakeholder emails
  // Function to submit stakeholder emails
  const submitStakeholderEmails = async (
    stakeholderId: string,
    emails: any[],
  ) => {
    try {
      for (const email of emails) {
        const payload: IApiPayload<StakeholderEmail> = {
          data: {
            ...email,
            stakeholder_id: stakeholderId,
          },
          files: [],
        };
        console.log("stakeholderemails payload", payload);

        await stakeholderEmailApiService.create(payload);
      }
    } catch (error) {
      console.error("Error submitting stakeholder emails", error);
    }
  };

  // Function to submit stakeholder phones
  const submitStakeholderPhones = async (
    stakeholderId: string,
    phones: any[],
  ) => {
    try {
      for (const phone of phones) {
        const payload: IApiPayload<StakeholderPhone> = {
          data: {
            ...phone,
            stakeholder_id: stakeholderId,
          },
          files: [],
        };
        await stakeholderPhoneApiService.create(payload);
      }
    } catch (error) {
      console.error("Error submitting stakeholder phones", error);
    }
  };

  const translatedTitle = t(`common.${isEdit ? 'edit' : 'create'}`) + " " + type?.title + " " + t('stakeholder.title');

  return (
    <CustomSideDrawer
      translatedTitle={translatedTitle}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          translatedTitle={translatedTitle}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...stakeholder,
            origin: isEdit ? stakeholder?.origin : stakeholder?.origin || 'Ethiopia',
            tin: stakeholder?.tin ?? '',
            license_issued_date: stakeholder?.license_issued_date
              ? getDynamicDate(
                i18n,
                moment(String(stakeholder?.license_issued_date)).toDate(),
              )
              : undefined,
            license_number: stakeholder?.license_number ?? '',
          }}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Stakeholder>) => {
            return (
              <StakeholderForm
                file={uploadableFile}
                onFileChange={onFileChange}
                typeId={typeId}
                formik={formik}
                isEdit={isEdit}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderDrawer;
