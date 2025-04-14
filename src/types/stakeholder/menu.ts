export type StakeholderSideSubMenu = {
  id: string;
  title: string;
  path: string;
};

export type StakeholderSideMenu = {
  id: string;
  title: string;
  subItems: StakeholderSideSubMenu[];
};
