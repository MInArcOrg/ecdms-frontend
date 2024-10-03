import OtherSubMenu from 'src/views/shared/layouts/other/others-sub-menu';
import { ReactNode } from 'react';
import OtherLayout from 'src/views/shared/layouts/other/other-layout';
import StakeholderLayout from '../../details/layout/stakeholder-layout';

interface OtherStakeholderLayoutProps {
  activeMenu: number; // The active main menu
  activeSubMenu?: number; // The active sub-menu (optional)
  subMenuItems: (baseUrl: string) => any[]; // Function to get sub-menu items based on baseUrl
  children: ReactNode; // The content that will be rendered in the main section
  activeType?: number; // Optionally, the active type (for the sub-menu)
  baseUrl: string; // The base URL for building menu paths
}

const StakeholderOtherLayout: React.FC<OtherStakeholderLayoutProps> = (props) => {
  return (
    <OtherLayout
      layoutComponent={StakeholderLayout}
      subMenuComponent={OtherSubMenu}
      {...props} // Spread props to pass children, activeMenu, and others
    />
  );
};

export default StakeholderOtherLayout;
