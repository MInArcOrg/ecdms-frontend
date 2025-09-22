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
  type?: string | String[];
  fileType?: string;
}
export type DetailSubMenuItem = {
  id: string;
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  apiRoute?: string;
  model?: string;
  type?: string | String[];
  subItems?: DetailSubMenuItemChild[];
};
