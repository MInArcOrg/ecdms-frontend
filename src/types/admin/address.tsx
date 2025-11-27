export enum AddressType {
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  CITY_ADMINISTRATION = "CITY-ADMINISTRATION",
  ZONE = "ZONE",
  CITY = "CITY",
  SUB_CITY = "SUB-CITY",
  WOREDA = "WOREDA",
  KEBELE = "KEBELE",
  OTHER = "OTHER",
}
export const addressTypes = [
  {
    type: AddressType.COUNTRY,
    parent: [],
    children: [AddressType.REGION, AddressType.CITY_ADMINISTRATION],
  },

  {
    type: AddressType.REGION,
    parent: [AddressType.COUNTRY],
    children: [AddressType.ZONE, AddressType.CITY],
  },
  {
    type: AddressType.CITY_ADMINISTRATION,
    parent: [AddressType.COUNTRY],
    children: [AddressType.SUB_CITY],
  },
  {
    type: AddressType.ZONE,
    parent: [AddressType.REGION],
    children: [AddressType.CITY, AddressType.WOREDA],
  },
  {
    type: AddressType.CITY,
    parent: [AddressType.ZONE],
    children: [AddressType.WOREDA, AddressType.SUB_CITY],
  },
  {
    type: AddressType.SUB_CITY,
    parent: [AddressType.CITY],
    children: [AddressType.WOREDA],
  },
  {
    type: AddressType.WOREDA,
    parent: [AddressType.SUB_CITY],
    children: [AddressType.KEBELE],
  },
  { type: AddressType.KEBELE, parent: [AddressType.WOREDA], children: [] },
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
