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
  // COUNTRY
  {
    type: AddressType.COUNTRY,
    parent: [],
    children: [
      AddressType.REGION,
      AddressType.CITY_ADMINISTRATION,
    ],
  },

  // REGION
  {
    type: AddressType.REGION,
    parent: [AddressType.COUNTRY],
    children: [
      AddressType.ZONE,
      AddressType.CITY, // Region → City is in the tree
    ],
  },

  // CITY ADMINISTRATION
  {
    type: AddressType.CITY_ADMINISTRATION,
    parent: [AddressType.COUNTRY],
    children: [AddressType.SUB_CITY],
  },

  // ZONE
  {
    type: AddressType.ZONE,
    parent: [AddressType.REGION],
    children: [
      AddressType.CITY,   // Zone → City → Sub City → Woreda → Kebele
      AddressType.WOREDA, // Zone → Woreda → City → Sub City → Kebele
    ],
  },

  // CITY
  {
    type: AddressType.CITY,
    parent: [AddressType.ZONE, AddressType.REGION],
    // CITY can come from Zone or directly from Region
    children: [AddressType.SUB_CITY],
  },

  // SUB CITY
  {
    type: AddressType.SUB_CITY,
    parent: [
      AddressType.CITY,
      AddressType.CITY_ADMINISTRATION,
    ],
    children: [AddressType.WOREDA],
  },

  // WOREDA
  {
    type: AddressType.WOREDA,
    parent: [
      AddressType.SUB_CITY, // normal
      AddressType.ZONE,     // rural branch (Zone → Woreda → City)
    ],
    children: [AddressType.KEBELE],
  },

  // KEBELE
  {
    type: AddressType.KEBELE,
    parent: [AddressType.WOREDA],
    children: [],
  },
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
