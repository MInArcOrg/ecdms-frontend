import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';
import { MasterCategory, MasterSubCategory, MasterType } from '../master/master-types';
import { GeneralMaster } from '../general/general-master';
import Department from '../department/department';

export interface Stakeholder {
  id: string;
  parent_id?: string;
  department_id?: string;
  stakeholdertype_id: string;
  stakeholdercategory_id: string;
  stakeholdersubcategory_id?: string;
  trade_name: string; // decrypted version
  tin: string;
  ownership_id: string;
  businessfield_id?: string;
  origin: string;
  license_issued_date?: string | Date | EthiopianDate;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;

  stakeholderemails?: StakeholderEmail[];
  stakeholderphones?: StakeholderPhone[];
  // operationlocations?: StakeholderOperationLocation[];

  stakeholdertype?: MasterType; // define a proper type if available
  stakeholdercategory?: MasterCategory; // define a proper type if available
  stakeholdersubcategory?: MasterSubCategory; // define a proper type if available
  ownership?: GeneralMaster; // define a proper type if available
  businessfield?: GeneralMaster; // define a proper type if available
  department?: Department; // define a proper type if available
}
export interface StakeholderEmail {
  id: string;
  stakeholder_id: string;
  email: string;
  is_primary: string;
}
export interface StakeholderPhone {
  id: string;
  stakeholder_id: string;
  phone: string;
  is_primary: string;
  created_at: string;
  updated_at: string;
}
export interface StakeholderInfo {
  id: string; // UUID as string
  parent_id?: string; // Optional UUID
  stakeholder_id: string; // UUID, cannot be null
  capital?: string; // Optional string
  general_manager?: string; // Optional string
  description?: string; // Optional text
  file_id?: string; // Optional UUID
  revision_no?: number; // Optional integer
  created_at?: Date; // Optional date for the created_at field
  updated_at?: Date; // Optional date for the updated_at field
}
