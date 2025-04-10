export type DetailMenuItem = {
  id: string;
  title: string;
  path: string;
  action?: string;
  subject?: string;
};
interface SubMenuItem {
  id: string;
  path: string;
  title: string;
  action?: string;
  subject?: string;
}
export type DetailSubMenuItem = {
  id: string;
  title: string;
  subItems: SubMenuItem[];
};
