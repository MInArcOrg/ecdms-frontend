export type DetailMenuItem = {
  id: string;
  title: string;
  path: string;
  type?: string;
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
  type?: string;
  id: string;
  title: string;
  subItems: DetailSubMenuItemChild[];
};
