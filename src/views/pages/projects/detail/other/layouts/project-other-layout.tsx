import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import OtherSubMenu from 'src/views/shared/layouts/other/others-sub-menu';
import { ReactNode } from 'react';
import OtherLayout from 'src/views/shared/layouts/other/other-layout';

interface OtherProjectLayoutProps {
  activeMenu: number; // The active main menu
  activeSubMenu?: number; // The active sub-menu (optional)
  subMenuItems: (baseUrl: string) => any[]; // Function to get sub-menu items based on baseUrl
  children: ReactNode; // The content that will be rendered in the main section
  activeType?: number; // Optionally, the active type (for the sub-menu)
  baseUrl: string; // The base URL for building menu paths
}

const ProjectOtherLayout: React.FC<OtherProjectLayoutProps> = (props) => {
  return (
    <OtherLayout
      layoutComponent={ProjectLayout}
      subMenuComponent={OtherSubMenu}
      {...props} // Spread props to pass children, activeMenu, and others
    />
  );
};

export default ProjectOtherLayout;
