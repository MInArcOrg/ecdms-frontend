import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import OtherSubMenu from 'src/views/shared/layouts/other/others-sub-menu';
import { ReactNode } from 'react';
import OtherLayout from 'src/views/shared/layouts/other/other-layout';

interface OtherProjectLayoutProps {
  activeMenu: number;
  activeSubMenu?: number;
  subMenuItems: (baseUrl: string) => any[];
  children: ReactNode;
  activeType?: number;
  baseUrl: string;
}

const ProjectOtherLayout: React.FC<OtherProjectLayoutProps> = (props) => {
  const { baseUrl, subMenuItems } = props;

  return <OtherLayout layoutComponent={ProjectLayout} subMenuComponent={OtherSubMenu} {...props} subMenuItems={subMenuItems(baseUrl)} />;
};

export default ProjectOtherLayout;
