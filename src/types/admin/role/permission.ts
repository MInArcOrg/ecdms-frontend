type Permission = {
  id: string;
  name: string;
  model: string;
  module: string;
  description: string;
  created_at: string;
  updatedAt: string;
};
export const appModules = ['member', 'admin', 'team'];
export default Permission;
