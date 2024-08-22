import projectResourceApiService from 'src/services/project/project-resource-service';
import { ProjectResource } from 'src/types/project/project-resource';
import { Resource } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import ProjectResourceForm from './project-resource-form';

interface ProjectResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectResource: ProjectResource;
  projectId: string;
  projectResources: ProjectResource[];
}

const ProjectResourceDrawer = (props: ProjectResourceDrawerType) => {
  const { open, toggle, refetch, projectResource, projectId } = props;
  const isEdit = Boolean(projectResource?.id);
  const onSubmit = async (body: Resource) => {
    const dataToSubmit: ProjectResource = {
      project_id: projectId,
      resource_id: body.id,
      id: ''
    };
    return projectResourceApiService.create({ data: dataToSubmit, files: [] });
  };
  const handleClose = () => toggle();
  return (
    <CustomSideDrawer
      title={`project.resource.${isEdit ? `edit-project-resource` : `create-project-resource`}`}
      handleClose={handleClose}
      open={open}
      width={700}
    >
      {() => <ProjectResourceForm refetch={refetch} onSubmit={onSubmit} addedResources={props.projectResources} />}
    </CustomSideDrawer>
  );
};

export default ProjectResourceDrawer;
