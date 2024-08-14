interface Address {
  id: string;
  parent_id?: string;
  model_id: string;
  country: string;
  region?: string;
  city?: string;
  subcity?: string;
  street?: string;
  block_number?: string;
  house_number?: string;
  hq?: boolean;
  northing: number;
  easting: number;
  revision_no?: number;
}
export default Address;
