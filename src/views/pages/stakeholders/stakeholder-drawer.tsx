/* eslint-disable prettier/prettier */

import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import { IApiPayload, IApiResponse } from "src/types/requests";
import StakeholderForm from "./stakeholder-form";
import { Stakeholder, StakeholderEmail, StakeholderPhone } from "src/types/stakeholder";
import stakeholderApiService from "src/services/stakeholders/stakeholder-service";
import moment from "moment";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import { uploadableProjectFileTypes, uploadableStakeholderFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import stakeholderEmailApiService from "src/services/stakeholders/stakeholder-email-service";
import stakeholderPhoneApiService from "src/services/stakeholders/stakeholder-phone-service";
import i18n from "src/configs/i18n";

interface StakeholderDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholder: Stakeholder;
  typeId: string;
}

const validationSchema = yup.object().shape({
  stakeholdercategory_id: yup.string().required("Category is required"),
  stakeholdersubcategory_id: yup.string().nullable(), // optional
  trade_name: yup.string().required("Trade Name is required"),
  tin: yup.string().required("TIN is required"),
  origin: yup.string().required("Origin is required"),
  license_issued_date: yup.date().required("License Issued Date is required"),
  stakeholderemails: yup.array().of(
    yup.object().shape({
      email: yup.string().email("Invalid email format").required("Email is required"),
      is_primary: yup.boolean().required(),
    })
  ).test({
    message: "There must be exactly one primary email",
    test: (emails) => {
      const primaryCount = emails?.filter((email) => email.is_primary).length || 0;
      return primaryCount === 1;
    },
  }),
  stakeholderphones: yup.array().of(
    yup.object().shape({
      phone: yup.string().required("Phone is required"),
      is_primary: yup.boolean().required(),
    })
  ).test({
    message: "There must be exactly one primary phone",
    test: (phones) => {
      const primaryCount = phones?.filter((phone) => phone.is_primary).length || 0;
      return primaryCount === 1;
    },
  }),
  ownership_id: yup.string().required("Ownership is required"),
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
  const onActionSuccess = async (
    response: IApiResponse<Stakeholder>,
    payload: IApiPayload<Stakeholder>
  ) => {
    // Handle file upload if there are files present
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableStakeholderFileTypes.stakeholder,
        response.payload.id,
        '',
        ''
      );
    }

    // Submit stakeholder phones and emails
    const { stakeholderemails, stakeholderphones } = payload.data;
    console.log('stakeholderphones', stakeholderphones)
    console.log('stakeholderemails', stakeholderemails)
    // Assuming you have a function to update or submit stakeholder's phones and emails
    if (stakeholderemails && stakeholderemails.length > 0) {
      await submitStakeholderEmails(response.payload.id, stakeholderemails);
    }

    if (stakeholderphones && stakeholderphones.length > 0) {
      await submitStakeholderPhones(response.payload.id, stakeholderphones);
    }


    // Refetch data and close the form/modal
    refetch();
    handleClose();
  };

  // Function to submit stakeholder emails
  // Function to submit stakeholder emails
  const submitStakeholderEmails = async (stakeholderId: string, emails: any[]) => {
    try {
      for (const email of emails) {
        const payload: IApiPayload<StakeholderEmail> = {
          data: {
            ...email,
            stakeholder_id: stakeholderId
          },
          files: []
        };
        console.log('stakeholderemails payload', payload)

        await stakeholderEmailApiService.create(payload);
      }
    } catch (error) {
      console.error("Error submitting stakeholder emails", error);
    }
  };

  // Function to submit stakeholder phones
  const submitStakeholderPhones = async (stakeholderId: string, phones: any[]) => {
    try {
      for (const phone of phones) {
        const payload: IApiPayload<StakeholderPhone> = {
          data: {
            ...phone,
            stakeholder_id: stakeholderId
          },
          files: []
        };
        await stakeholderPhoneApiService.create(payload);
      }
    } catch (error) {
      console.error("Error submitting stakeholder phones", error);
    }
  };



  return (
    <CustomSideDrawer
      title={`stakeholder.${isEdit ? "edit-stakeholder" : "create-stakeholder"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.${isEdit ? "edit-stakeholder" : "create-stakeholder"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...stakeholder,
            license_issued_date: stakeholder?.license_issued_date
              ? getDynamicDate(i18n, moment(String(stakeholder?.license_issued_date)).toDate())
              : undefined,
          }}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Stakeholder>) => {
            return <StakeholderForm typeId={typeId} formik={formik} isEdit={isEdit} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderDrawer;
