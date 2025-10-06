import { ThemeColor } from "src/@core/layouts/types";
import { LangType } from "src/types/lang";

export const LANG_CONST_ARRAY: LangType[] = [
  {
    label: "Afaan Oromoo",
    id: "om",
    default: true,
  },
  {
    label: "English",
    id: "en",
    default: false,
  },
  {
    label: "አማርኛ",
    id: "am",
    default: false,
  },
];
export const ITEMS_LISTING_TYPE = {
  grid: { label: "Grid", value: "grid" },
  masonry: { label: "Masonry", value: "masonry" },
  list: { label: "List", value: "list" },
  table: { label: "Table", value: "table" },
};
export const availableColors: ThemeColor[] = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
];
export const genderList = (
  transl: (word: string) => string
): { label: string; value: string }[] => [
    { label: transl("department.user.male"), value: "M" },
    { label: transl("department.user.female"), value: "F" },
  ];
export const maritalStatusList = (
  transl: (word: string) => string
): { label: string; value: number }[] => [
    { label: transl("department.user.single"), value: 0 },
    { label: transl("department.user.married"), value: 1 },
  ];
export const masterDataFlagConstanct = (transl: (word: string) => string) => {
  return [
    { label: transl("common.status.active"), value: 1 },
    { label: transl("common.status.inactive"), value: 0 },
  ];
};
export const gridSpacing = 2;
export const acadamicLevels: string[] = [
  "1-12",
  "Certificate",
  "Diplome Degree",
  "Bachilor Degree",
  "Masters Degree",
  "PHD Degree",
  "others",
];
export const appModulesNames = [
  "Masterdata",
  "project",
  "stakeholder",
  "resource",
  "document",
  "infrastructure",
];
export const appModulesWithIds = [
  { id: "master-data", name: "Masterdata" },
  {
    id: "project",
    name: "Project",
    flags: [
      {
        id: "ELECTRIC",
        name: "Electric",
      },
      {
        id: "BUILDING",
        name: "Building",
      },
      {
        id: "AIRFILED_AIRPORT",
        name: "Airfield/Airport",
      },
      {
        id: "RAILWAY",
        name: "Railway",
      },
      {
        id: "TELECOMMUNICATION",
        name: "Telecommunication",
      },
      {
        id: "ROAD",
        name: "Road",
      },
      {
        id: "WATER_INFRASTRUCTURE",
        name: "Water Infrastructure",
      },
    ],
  },
  {
    id: "stakeholder", name: "Stakeholder", flags:
      [
        {
          id: "MSME",
          name: "MSME",
        },
        { id: "EDUCATION_INSTITUTION", name: "EDUCATION_INSTITUTION" },
        { id: "CONSULTANT", name: "CONSULTANT" },
        { id: "ASSOCIATION", name: "ASSOCIATION" },
        { id: "REGULATORY_BODY", name: "REGULATORY_BODY" },
        { id: "REAL_ESTATE_DEVELOPER", name: "REAL_ESTATE_DEVELOPER" },
        { id: "CONTRACTOR", name: "CONTRACTOR" },
      ]
  },
  {
    id: "resource", name: "Resource", flags: [
      { id: "LEGAL_FRAMEWORK", name: "LEGAL_FRAMEWORK" },
      { id: "RESEARCH", name: "RESEARCH" },
      { id: "REFERENCE", name: "REFERENCE" },
      { id: "BOOK", name: "BOOK" }
    ]
  },
  { id: "document", name: "Document", flags: [] },
  { id: "infrastructure", name: "Infrastructure", flags: [] },
];
