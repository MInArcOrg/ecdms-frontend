export type DetailMenuItem = {
  id: string;
  title: string;
  path: string;
  type?: string | String[];
  action?: string;
  subject?: string;
};
export interface DetailSubMenuItemChild {
  id: string;
  path: string;
  title: string;
  action?: string;
  subject?: string;
  apiRoute?: string;
  model?: string;
}
export type DetailSubMenuItem = {
  type?: string | String[];
  id: string;
  title: string;
  subItems: DetailSubMenuItemChild[];
};
