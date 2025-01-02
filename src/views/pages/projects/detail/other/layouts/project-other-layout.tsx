import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import OtherSubMenu from 'src/views/shared/layouts/other/others-sub-menu';
import { ReactNode, useMemo } from 'react';
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
  // Memoize the subMenuItems to prevent unnecessary recalculations and re-renders
  const memoizedSubMenuItems = useMemo(() => props.subMenuItems(props.baseUrl), [props.baseUrl, props.subMenuItems]);

  return (
    <OtherLayout
      layoutComponent={ProjectLayout}
      subMenuComponent={OtherSubMenu}
      {...props}
      subMenuItems={memoizedSubMenuItems}
    />
  );
};

export default ProjectOtherLayout;
