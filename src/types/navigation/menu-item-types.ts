export interface MenuItem {
  title: string;
  icon?: string;
  path?: string;
  action?: string;
  subject?: string;
  children?: MenuItem[];
}

export interface NavLink {
  title: string;
  icon?: string;
  path: string;
  action?: string;
  subject?: string;
}

export interface NavGroup {
  title: string;
  icon?: string;
  children: MenuItem[];
  action?: string;
  subject?: string;
}

export interface NavSectionTitle {
  sectionTitle: string;
}

export type NavigationItem = MenuItem | NavLink | NavGroup | NavSectionTitle;
