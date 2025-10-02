import type { FormikProps } from "formik";
import type { IApiPayload } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import ProjectContactPersonForm from "./project-contact-person-form";
import projectContactPersonApiService from "src/services/project/project-contact-person-service";
import type { ProjectContactPerson } from "src/types/project/projext-contact-person";
import type { Stakeholder } from "src/types/stakeholder";

interface ProjectContactPersonDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  contactPerson: ProjectContactPerson;
  projectId: string;
  stakeholders: Stakeholder[];
}

const ProjectContactPersonDrawer: React.FC<ProjectContactPersonDrawerProps> = ({
  open,
  toggle,
  refetch,
  contactPerson,
  projectId,
  stakeholders,
}) => {
  const validationSchema = yup.object().shape({
    first_name: yup.string().max(36).required("First name is required"),
    middle_name: yup.string().max(255).required("Middle name is required"),
    last_name: yup.string().max(255).required("Last name is required"),
    gender: yup.string().max(255).required("Gender is required"),
    phone: yup.string().max(255).required("Phone is required"),
    email: yup.string().email("Enter a valid email").max(255).nullable(),
    project_id: yup.string().length(36).required("Project is required"),
    stakeholder_id: yup.string().length(36).required("Stakeholder is required"),
    parent_id: yup.string().length(36).nullable(),
    department: yup.string().max(255).nullable(),
    position: yup.string().max(255).nullable(),
    national_id_no: yup.string().max(255).nullable(),
  });

  const isEdit = Boolean(contactPerson?.id);

  const createContactPerson = async (body: IApiPayload<ProjectContactPerson>) =>
    projectContactPersonApiService.create(body);

  const editContactPerson = async (body: IApiPayload<ProjectContactPerson>) =>
    projectContactPersonApiService.update(contactPerson?.id || "", body);

  const getPayload = (values: ProjectContactPerson) => ({
    data: {
      ...values,
      id: contactPerson?.id,
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-contact-person.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-contact-person.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(contactPerson as ProjectContactPerson),
            project_id: projectId,
          }}
          createActionFunc={isEdit ? editContactPerson : createContactPerson}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectContactPerson>) => (
            <ProjectContactPersonForm
              formik={formik}
              stakeholders={stakeholders}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectContactPersonDrawer;
