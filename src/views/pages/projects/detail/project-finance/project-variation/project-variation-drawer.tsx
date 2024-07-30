import * as yup from "yup";
import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ProjectVariationForm from "./project-variation-form"; // Import your project form component
import { IApiPayload } from "src/types/requests";
import projectVariationApiService from "src/services/project/project-finance-service";
import { ProjectVariation } from "src/types/project/project-finance";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import i18n from "src/configs/i18n";
import moment from "moment";
import { convertDateToLocaleDate } from "src/utils/formatter/date";
import { variationConstants } from "src/constants/variation-contants";
import { useTranslation } from "react-i18next";

interface ProjectVariationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectVariation: ProjectVariation;
  projectId: string;
  type: string;
}



const ProjectVariationDrawer = (props: ProjectVariationDrawerType) => {
  // ** Props
  const { open, toggle, refetch, projectVariation, projectId, type } = props;
  const {t}=useTranslation();
  
  // console.log('totalVara tion', totalVariation)

  const percentagetCalculator = event => {
    return (event / projectFinance?.price_after_rebate) * 100
  }

  const calculateAmount = e => {
    const { value } = e.target
    formik.setFieldValue('percentage', value)
    formik.setFieldValue('amount', amountCalculator(value))
  }

  const calculatePercentage = e => {
    const { value } = e.target

    formik.setFieldValue('amount', value)
    formik.setFieldValue('percentage', percentagetCalculator(value))
  }

  const amountCalculator = event => {
    return projectFinance?.price_after_rebate * (event / 100)
  }

  const percentOf = value => {
    return (projectFinance?.price_after_rebate * value) / 100
  }

  const totalVariationPercent = percentagetCalculator(totalVariation)
  const allowedVariation = percentOf(projectFinanceMinPercent[type]?.percent)
  const remainingVariation = allowedVariation - totalVariation
  const remainingVariationPercent = percentagetCalculator(remainingVariation)
  const validationSchema = yup.object().shape({
    extension_time: yup
      .number()
      .required(`${t("Extension Time")} ${t("is required")}`),
    approval_date: yup.date().required(`${t("Approval Date")} ${t("is required")}`),
    amount: yup
      .number()
      .required(`${t("Amount")} ${t("is required")}`)
      .when("type", {
        is: variationConstants.SUPPLEMENT.value || variationConstants.VARIATION.value,

        then: yup.number().max(remainingVariation),
      })
      .moreThan(0),
  
    percentage: yup
      .number()
      .required(`${t("Percentage")} ${t("is required")}`)
      .moreThan(0)
      .when("type", {
        is:
          projectFinanceMinPercent.SUPPLMENT.name ||
          projectFinanceMinPercent.VARIATION.name,
        then: yup.number().max(remainingVariationPercent),
      }),
  });
  const isEdit = projectVariation?.id ? true : false;

  const createProjectVariation = async (
    body: IApiPayload<ProjectVariation>
  ) => {
    return await projectVariationApiService.create(body);
  };

  const editProjectVariation = async (body: IApiPayload<ProjectVariation>) => {
    return await projectVariationApiService.update(
      projectVariation?.id || "",
      body
    );
  };

  const getPayload = (values: ProjectVariation) => {
    const payload = {
      data: {
        ...values,
        approval_date: convertDateToLocaleDate(values.approval_date),
        id: projectVariation?.id,
        project_id: projectId,
        type,
      },
      files: [], // Adjust if you need to handle files
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
      title={`project.project-variation.${
        isEdit ? "edit-project-variation" : "create-project-variation"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.project-variation.title" // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectVariation as ProjectVariation),
            approval_date: projectVariation?.approval_date
              ? getDynamicDate(
                  i18n,
                  moment(String(projectVariation?.approval_date)).toDate()
                )
              : undefined,
          }}
          createActionFunc={
            isEdit ? editProjectVariation : createProjectVariation
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectVariation>) => {
            return <ProjectVariationForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectVariationDrawer;
