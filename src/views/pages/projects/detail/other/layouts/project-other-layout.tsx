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
  const { baseUrl, subMenuItems } = props;

  // Ensure subMenuItems is a function before calling it
  const memoizedSubMenuItems = useMemo(
    () => (typeof subMenuItems === 'function' ? subMenuItems(baseUrl) : []),
    [baseUrl, subMenuItems]
  );

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
