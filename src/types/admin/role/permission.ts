type Permission = {
  id: string;
  name: string;
  model: string;
  module: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export const appModules = ['member', 'admin', 'team'];
export default Permission;
