export enum AddressType {
  REGION = "REGION",
  CITY_ADMINISTRATION = "CITY_ADMINISTRATION",
  ZONE = "ZONE",
  CITY = "CITY",
  SUB_CITY = "SUB-CITY",
  WOREDA = "WOREDA",
  KEBELE = "KEBELE",
  OTHER = "OTHER",
}
export const addressTypes = [
  { type: AddressType.REGION, parent: [] },
  { type: AddressType.CITY_ADMINISTRATION, parent: [] },
  {
    type: AddressType.ZONE,
    parent: [AddressType.REGION, AddressType.CITY_ADMINISTRATION],
  },
  { type: AddressType.CITY, parent: [AddressType.ZONE] },
  { type: AddressType.SUB_CITY, parent: [AddressType.CITY] },
  { type: AddressType.WOREDA, parent: [AddressType.SUB_CITY] },
  { type: AddressType.KEBELE, parent: [AddressType.WOREDA] },
  { type: AddressType.OTHER, parent: [] },
];

export type AddressMaster = {
  id: string;
  parent: string; // main = Ethiopia
  parent_address_id?: string;
  parentAddress?: AddressMaster;
  type?: AddressType;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};
