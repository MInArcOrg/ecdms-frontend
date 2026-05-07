// ** React Imports
import { useState, useRef, useEffect } from 'react';

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  Menu
} from '@mui/material';

// ** Third-Party Imports
import { useQuery } from '@tanstack/react-query';

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import RegionalTrendLineChart from 'src/views/analytics/General/regional-trend-line-chart';

// ** Icons
import Icon from 'src/@core/components/icon';

// ** Services
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { generateYears } from 'src/utils/genertor/date';
import { MasterType } from 'src/types/master/master-types';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

interface AnalyticsDashboardProps {
  module: 'project' | 'stakeholder' | 'infrastructure';
  Layout: React.ComponentType<{ children: React.ReactNode }>;
  summaryService: { getTypeSummary: (params: any) => Promise<any> };
}

const DUMMY_INFRA_PROJECT_TYPES = [
  'Air field / Air port',
  'Building',
  'Electric',
  'Railway',
  'Road',
  'Telecommunication',
  'Water Infrastructure'
];

const DUMMY_STAKEHOLDER_TYPES = [
  'Associations',
  'Consultants',
  'Contractor',
  'Education Institutions',
  'MSMEs',
  'Others',
  'Real estate developer',
  'Regulatory Body'
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const DUMMY_DATE = new Date().toISOString();

const makeDummyMasterType = (module: 'project' | 'stakeholder' | 'infrastructure', title: string): MasterType => ({
  id: `dummy-${module}-type-${hashString(title)}`,
  title,
  description: '',
  file_id: null,
  parent_id: null,
  revision_no: null,
  flag: null,
  created_at: DUMMY_DATE,
  updated_at: DUMMY_DATE
});

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type DummyCategory = {
  id: string;
  title: string;
  subcategories: Array<{ id: string; title: string }>;
};

const getDummyCategoriesForType = (typeTitle: string): DummyCategory[] => {
  const key = typeTitle.toLowerCase();

  if (key.includes('road')) {
    return [
      {
        id: 'road-gravel',
        title: 'Gravel Road',
        subcategories: [
          { id: 'road-gravel-new', title: 'New Construction' },
          { id: 'road-gravel-rehab', title: 'Rehabilitation' },
          { id: 'road-gravel-maint', title: 'Routine Maintenance' },
          { id: 'road-gravel-upg', title: 'Upgrading' }
        ]
      },
      {
        id: 'road-asphalt',
        title: 'Asphalt Road',
        subcategories: [
          { id: 'road-asphalt-new', title: 'New Construction' },
          { id: 'road-asphalt-rehab', title: 'Rehabilitation' },
          { id: 'road-asphalt-maint', title: 'Periodic Maintenance' },
          { id: 'road-asphalt-safety', title: 'Safety Improvement' }
        ]
      },
      {
        id: 'road-asphalt-concrete',
        title: 'Asphalt Concrete Road',
        subcategories: [
          { id: 'road-ac-new', title: 'New Construction' },
          { id: 'road-ac-overlay', title: 'Overlay Works' },
          { id: 'road-ac-rehab', title: 'Rehabilitation' },
          { id: 'road-ac-drain', title: 'Drainage Improvement' }
        ]
      },
      {
        id: 'road-reed',
        title: 'Reed Road',
        subcategories: [
          { id: 'road-reed-new', title: 'New Construction' },
          { id: 'road-reed-rehab', title: 'Rehabilitation' },
          { id: 'road-reed-maint', title: 'Routine Maintenance' },
          { id: 'road-reed-spot', title: 'Spot Improvement' }
        ]
      }
    ];
  }

  if (key.includes('water')) {
    return [
      {
        id: 'water-supply',
        title: 'Water Supply',
        subcategories: [
          { id: 'water-supply-urban', title: 'Urban Water Supply' },
          { id: 'water-supply-rural', title: 'Rural Water Supply' },
          { id: 'water-supply-treatment', title: 'Treatment Plants' },
          { id: 'water-supply-network', title: 'Distribution Network' }
        ]
      },
      {
        id: 'water-wastewater',
        title: 'Wastewater',
        subcategories: [
          { id: 'water-ww-collection', title: 'Collection Network' },
          { id: 'water-ww-treatment', title: 'Treatment Facility' },
          { id: 'water-ww-pumping', title: 'Pumping Stations' },
          { id: 'water-ww-reuse', title: 'Reuse & Recycling' }
        ]
      },
      {
        id: 'water-irrigation',
        title: 'Irrigation',
        subcategories: [
          { id: 'water-irr-canals', title: 'Canals' },
          { id: 'water-irr-dams', title: 'Small Dams' },
          { id: 'water-irr-modern', title: 'Modern Irrigation' },
          { id: 'water-irr-rehab', title: 'Rehabilitation' }
        ]
      },
      {
        id: 'water-drainage',
        title: 'Drainage',
        subcategories: [
          { id: 'water-drain-urban', title: 'Urban Drainage' },
          { id: 'water-drain-flood', title: 'Flood Control' },
          { id: 'water-drain-culvert', title: 'Culverts & Crossings' },
          { id: 'water-drain-maint', title: 'Maintenance' }
        ]
      }
    ];
  }

  if (key.includes('electric')) {
    return [
      {
        id: 'elec-generation',
        title: 'Generation',
        subcategories: [
          { id: 'elec-gen-hydro', title: 'Hydropower' },
          { id: 'elec-gen-solar', title: 'Solar' },
          { id: 'elec-gen-wind', title: 'Wind' },
          { id: 'elec-gen-thermal', title: 'Thermal' }
        ]
      },
      {
        id: 'elec-transmission',
        title: 'Transmission',
        subcategories: [
          { id: 'elec-tr-lines', title: 'Transmission Lines' },
          { id: 'elec-tr-sub', title: 'Substations' },
          { id: 'elec-tr-upg', title: 'Upgrading' },
          { id: 'elec-tr-prot', title: 'Protection Systems' }
        ]
      },
      {
        id: 'elec-distribution',
        title: 'Distribution',
        subcategories: [
          { id: 'elec-dist-lines', title: 'Distribution Lines' },
          { id: 'elec-dist-transform', title: 'Transformers' },
          { id: 'elec-dist-meter', title: 'Metering' },
          { id: 'elec-dist-rehab', title: 'Rehabilitation' }
        ]
      },
      {
        id: 'elec-electrification',
        title: 'Electrification',
        subcategories: [
          { id: 'elec-elec-rural', title: 'Rural Electrification' },
          { id: 'elec-elec-grid', title: 'Grid Extension' },
          { id: 'elec-elec-mini', title: 'Mini-Grid' },
          { id: 'elec-elec-standalone', title: 'Standalone Systems' }
        ]
      }
    ];
  }

  if (key.includes('tele')) {
    return [
      {
        id: 'tele-backbone',
        title: 'Backbone Network',
        subcategories: [
          { id: 'tele-bb-fiber', title: 'Fiber Rollout' },
          { id: 'tele-bb-upg', title: 'Upgrading' },
          { id: 'tele-bb-links', title: 'Microwave Links' },
          { id: 'tele-bb-core', title: 'Core Network' }
        ]
      },
      {
        id: 'tele-mobile',
        title: 'Mobile Coverage',
        subcategories: [
          { id: 'tele-m-4g', title: '4G Expansion' },
          { id: 'tele-m-5g', title: '5G Pilot' },
          { id: 'tele-m-rural', title: 'Rural Coverage' },
          { id: 'tele-m-sites', title: 'New Sites' }
        ]
      },
      {
        id: 'tele-broadband',
        title: 'Broadband',
        subcategories: [
          { id: 'tele-bb-ftth', title: 'FTTH' },
          { id: 'tele-bb-enterprise', title: 'Enterprise Links' },
          { id: 'tele-bb-isp', title: 'ISP Enablement' },
          { id: 'tele-bb-capacity', title: 'Capacity Upgrade' }
        ]
      },
      {
        id: 'tele-digital',
        title: 'Digital Services',
        subcategories: [
          { id: 'tele-d-e-gov', title: 'e-Government' },
          { id: 'tele-d-pay', title: 'Digital Payments' },
          { id: 'tele-d-health', title: 'Digital Health' },
          { id: 'tele-d-edu', title: 'Digital Education' }
        ]
      }
    ];
  }

  if (key.includes('rail')) {
    return [
      {
        id: 'rail-track',
        title: 'Track Works',
        subcategories: [
          { id: 'rail-track-new', title: 'New Line Construction' },
          { id: 'rail-track-rehab', title: 'Rehabilitation' },
          { id: 'rail-track-maint', title: 'Maintenance' },
          { id: 'rail-track-upg', title: 'Upgrading' }
        ]
      },
      {
        id: 'rail-stations',
        title: 'Stations',
        subcategories: [
          { id: 'rail-st-new', title: 'New Stations' },
          { id: 'rail-st-upg', title: 'Upgrading' },
          { id: 'rail-st-access', title: 'Accessibility' },
          { id: 'rail-st-safety', title: 'Safety Systems' }
        ]
      },
      {
        id: 'rail-signal',
        title: 'Signaling',
        subcategories: [
          { id: 'rail-sig-install', title: 'Installation' },
          { id: 'rail-sig-upg', title: 'Upgrade' },
          { id: 'rail-sig-comm', title: 'Communication' },
          { id: 'rail-sig-control', title: 'Control Center' }
        ]
      },
      {
        id: 'rail-rolling',
        title: 'Rolling Stock',
        subcategories: [
          { id: 'rail-rs-loco', title: 'Locomotives' },
          { id: 'rail-rs-coach', title: 'Passenger Coaches' },
          { id: 'rail-rs-freight', title: 'Freight Wagons' },
          { id: 'rail-rs-maint', title: 'Maintenance Facility' }
        ]
      }
    ];
  }

  if (key.includes('building')) {
    return [
      {
        id: 'bld-public',
        title: 'Public Buildings',
        subcategories: [
          { id: 'bld-p-schools', title: 'Schools' },
          { id: 'bld-p-hosp', title: 'Hospitals' },
          { id: 'bld-p-admin', title: 'Administrative' },
          { id: 'bld-p-other', title: 'Other Public' }
        ]
      },
      {
        id: 'bld-residential',
        title: 'Residential',
        subcategories: [
          { id: 'bld-r-affordable', title: 'Affordable Housing' },
          { id: 'bld-r-condo', title: 'Condominiums' },
          { id: 'bld-r-rehab', title: 'Rehabilitation' },
          { id: 'bld-r-new', title: 'New Construction' }
        ]
      },
      {
        id: 'bld-commercial',
        title: 'Commercial',
        subcategories: [
          { id: 'bld-c-markets', title: 'Markets' },
          { id: 'bld-c-offices', title: 'Office Buildings' },
          { id: 'bld-c-hotels', title: 'Hotels' },
          { id: 'bld-c-malls', title: 'Malls' }
        ]
      },
      {
        id: 'bld-industrial',
        title: 'Industrial',
        subcategories: [
          { id: 'bld-i-sheds', title: 'Sheds & Warehouses' },
          { id: 'bld-i-factories', title: 'Factories' },
          { id: 'bld-i-parks', title: 'Industrial Parks' },
          { id: 'bld-i-rehab', title: 'Rehabilitation' }
        ]
      }
    ];
  }

  if (key.includes('air')) {
    return [
      {
        id: 'air-runway',
        title: 'Runway & Airside',
        subcategories: [
          { id: 'air-rwy-new', title: 'New Runway' },
          { id: 'air-rwy-rehab', title: 'Rehabilitation' },
          { id: 'air-rwy-light', title: 'Airfield Lighting' },
          { id: 'air-rwy-taxi', title: 'Taxiways' }
        ]
      },
      {
        id: 'air-terminal',
        title: 'Terminal Facilities',
        subcategories: [
          { id: 'air-ter-exp', title: 'Terminal Expansion' },
          { id: 'air-ter-ren', title: 'Renovation' },
          { id: 'air-ter-baggage', title: 'Baggage Systems' },
          { id: 'air-ter-security', title: 'Security Systems' }
        ]
      },
      {
        id: 'air-navigation',
        title: 'Navigation',
        subcategories: [
          { id: 'air-nav-radar', title: 'Radar' },
          { id: 'air-nav-comm', title: 'Communication' },
          { id: 'air-nav-mets', title: 'Meteorology' },
          { id: 'air-nav-upg', title: 'Upgrading' }
        ]
      },
      {
        id: 'air-support',
        title: 'Support Services',
        subcategories: [
          { id: 'air-sup-fire', title: 'Fire & Rescue' },
          { id: 'air-sup-fuel', title: 'Fuel Systems' },
          { id: 'air-sup-cargo', title: 'Cargo Facilities' },
          { id: 'air-sup-maint', title: 'Maintenance' }
        ]
      }
    ];
  }

  if (key.includes('association')) {
    return [
      {
        id: 'assoc-business',
        title: 'Business Association',
        subcategories: [
          { id: 'assoc-business-chamber', title: 'Chamber of Commerce' },
          { id: 'assoc-business-sector', title: 'Sector Association' },
          { id: 'assoc-business-coop', title: 'Cooperative Union' },
          { id: 'assoc-business-trade', title: 'Trade Federation' }
        ]
      },
      {
        id: 'assoc-professional',
        title: 'Professional Association',
        subcategories: [
          { id: 'assoc-pro-eng', title: 'Engineering Association' },
          { id: 'assoc-pro-law', title: 'Legal Association' },
          { id: 'assoc-pro-fin', title: 'Accounting Association' },
          { id: 'assoc-pro-med', title: 'Medical Association' }
        ]
      },
      {
        id: 'assoc-special',
        title: 'Special Interest Association',
        subcategories: [
          { id: 'assoc-sp-women', title: 'Women Association' },
          { id: 'assoc-sp-youth', title: 'Youth Association' },
          { id: 'assoc-sp-dis', title: 'Disability Association' },
          { id: 'assoc-sp-env', title: 'Environmental Association' }
        ]
      },
      {
        id: 'assoc-trade',
        title: 'Trade Association',
        subcategories: [
          { id: 'assoc-tr-imp', title: 'Importers' },
          { id: 'assoc-tr-exp', title: 'Exporters' },
          { id: 'assoc-tr-manu', title: 'Manufacturers' },
          { id: 'assoc-tr-serv', title: 'Service Providers' }
        ]
      }
    ];
  }

  if (key.includes('consultant')) {
    return [
      {
        id: 'cons-engineering',
        title: 'Engineering Consulting',
        subcategories: [
          { id: 'cons-eng-design', title: 'Design' },
          { id: 'cons-eng-supervision', title: 'Supervision' },
          { id: 'cons-eng-qc', title: 'Quality Control' },
          { id: 'cons-eng-geo', title: 'Geotechnical' }
        ]
      },
      {
        id: 'cons-finance',
        title: 'Financial Consulting',
        subcategories: [
          { id: 'cons-fin-audit', title: 'Audit' },
          { id: 'cons-fin-advisory', title: 'Advisory' },
          { id: 'cons-fin-feas', title: 'Feasibility Study' },
          { id: 'cons-fin-proc', title: 'Procurement Support' }
        ]
      },
      {
        id: 'cons-management',
        title: 'Management Consulting',
        subcategories: [
          { id: 'cons-mgt-strategy', title: 'Strategy' },
          { id: 'cons-mgt-pmo', title: 'PMO Support' },
          { id: 'cons-mgt-change', title: 'Change Management' },
          { id: 'cons-mgt-process', title: 'Process Improvement' }
        ]
      },
      {
        id: 'cons-ict',
        title: 'ICT Consulting',
        subcategories: [
          { id: 'cons-ict-arch', title: 'Architecture' },
          { id: 'cons-ict-impl', title: 'Implementation' },
          { id: 'cons-ict-sec', title: 'Security' },
          { id: 'cons-ict-data', title: 'Data & Analytics' }
        ]
      }
    ];
  }

  if (key.includes('contractor')) {
    return [
      {
        id: 'cont-general',
        title: 'General Contractor',
        subcategories: [
          { id: 'cont-gen-building', title: 'Building Works' },
          { id: 'cont-gen-road', title: 'Road Works' },
          { id: 'cont-gen-water', title: 'Water Works' },
          { id: 'cont-gen-electric', title: 'Electrical Works' }
        ]
      },
      {
        id: 'cont-specialized',
        title: 'Specialized Contractor',
        subcategories: [
          { id: 'cont-sp-mech', title: 'Mechanical' },
          { id: 'cont-sp-elec', title: 'Electrical' },
          { id: 'cont-sp-finish', title: 'Finishing' },
          { id: 'cont-sp-structure', title: 'Structural' }
        ]
      },
      {
        id: 'cont-maintenance',
        title: 'Maintenance Contractor',
        subcategories: [
          { id: 'cont-m-road', title: 'Road Maintenance' },
          { id: 'cont-m-building', title: 'Building Maintenance' },
          { id: 'cont-m-water', title: 'Water Systems' },
          { id: 'cont-m-power', title: 'Power Systems' }
        ]
      },
      {
        id: 'cont-supply',
        title: 'Supply & Installation',
        subcategories: [
          { id: 'cont-si-equipment', title: 'Equipment Supply' },
          { id: 'cont-si-materials', title: 'Materials Supply' },
          { id: 'cont-si-install', title: 'Installation' },
          { id: 'cont-si-commission', title: 'Commissioning' }
        ]
      }
    ];
  }

  if (key.includes('education')) {
    return [
      {
        id: 'edu-university',
        title: 'Universities',
        subcategories: [
          { id: 'edu-uni-public', title: 'Public Universities' },
          { id: 'edu-uni-private', title: 'Private Universities' },
          { id: 'edu-uni-research', title: 'Research Institutes' },
          { id: 'edu-uni-extension', title: 'Extension Programs' }
        ]
      },
      {
        id: 'edu-tvet',
        title: 'TVET',
        subcategories: [
          { id: 'edu-tvet-public', title: 'Public TVET' },
          { id: 'edu-tvet-private', title: 'Private TVET' },
          { id: 'edu-tvet-centers', title: 'Training Centers' },
          { id: 'edu-tvet-apprentice', title: 'Apprenticeship' }
        ]
      },
      {
        id: 'edu-college',
        title: 'Colleges',
        subcategories: [
          { id: 'edu-col-health', title: 'Health Colleges' },
          { id: 'edu-col-business', title: 'Business Colleges' },
          { id: 'edu-col-ict', title: 'ICT Colleges' },
          { id: 'edu-col-engineering', title: 'Engineering Colleges' }
        ]
      },
      {
        id: 'edu-school',
        title: 'Schools',
        subcategories: [
          { id: 'edu-sch-primary', title: 'Primary Schools' },
          { id: 'edu-sch-secondary', title: 'Secondary Schools' },
          { id: 'edu-sch-prep', title: 'Preparatory Schools' },
          { id: 'edu-sch-special', title: 'Special Needs Schools' }
        ]
      }
    ];
  }

  if (key.includes('msme')) {
    return [
      {
        id: 'msme-manufacturing',
        title: 'Manufacturing',
        subcategories: [
          { id: 'msme-m-food', title: 'Food Processing' },
          { id: 'msme-m-textile', title: 'Textile & Garment' },
          { id: 'msme-m-metal', title: 'Metal Works' },
          { id: 'msme-m-wood', title: 'Wood Works' }
        ]
      },
      {
        id: 'msme-service',
        title: 'Services',
        subcategories: [
          { id: 'msme-s-transport', title: 'Transport' },
          { id: 'msme-s-ict', title: 'ICT Services' },
          { id: 'msme-s-maint', title: 'Maintenance' },
          { id: 'msme-s-hospitality', title: 'Hospitality' }
        ]
      },
      {
        id: 'msme-trade',
        title: 'Trade',
        subcategories: [
          { id: 'msme-t-retail', title: 'Retail' },
          { id: 'msme-t-wholesale', title: 'Wholesale' },
          { id: 'msme-t-import', title: 'Import' },
          { id: 'msme-t-export', title: 'Export' }
        ]
      },
      {
        id: 'msme-construction',
        title: 'Construction',
        subcategories: [
          { id: 'msme-c-materials', title: 'Materials Supply' },
          { id: 'msme-c-labor', title: 'Labor Services' },
          { id: 'msme-c-finishing', title: 'Finishing' },
          { id: 'msme-c-civil', title: 'Civil Works' }
        ]
      }
    ];
  }

  if (key.includes('real estate') || key.includes('developer')) {
    return [
      {
        id: 're-housing',
        title: 'Housing Development',
        subcategories: [
          { id: 're-h-affordable', title: 'Affordable Housing' },
          { id: 're-h-condo', title: 'Condominiums' },
          { id: 're-h-apartment', title: 'Apartments' },
          { id: 're-h-residential', title: 'Residential Estates' }
        ]
      },
      {
        id: 're-commercial',
        title: 'Commercial Development',
        subcategories: [
          { id: 're-c-mall', title: 'Malls' },
          { id: 're-c-office', title: 'Office Buildings' },
          { id: 're-c-hotel', title: 'Hotels' },
          { id: 're-c-mixed', title: 'Mixed-Use' }
        ]
      },
      {
        id: 're-land',
        title: 'Land Development',
        subcategories: [
          { id: 're-l-serviced', title: 'Serviced Plots' },
          { id: 're-l-industrial', title: 'Industrial Land' },
          { id: 're-l-infra', title: 'Infrastructure Works' },
          { id: 're-l-planning', title: 'Planning & Survey' }
        ]
      },
      {
        id: 're-property',
        title: 'Property Services',
        subcategories: [
          { id: 're-p-management', title: 'Property Management' },
          { id: 're-p-sales', title: 'Sales & Marketing' },
          { id: 're-p-valuation', title: 'Valuation' },
          { id: 're-p-leasing', title: 'Leasing' }
        ]
      }
    ];
  }

  if (key.includes('regulatory')) {
    return [
      {
        id: 'reg-licensing',
        title: 'Licensing',
        subcategories: [
          { id: 'reg-lc-new', title: 'New Licenses' },
          { id: 'reg-lc-renew', title: 'Renewals' },
          { id: 'reg-lc-suspend', title: 'Suspensions' },
          { id: 'reg-lc-revoke', title: 'Revocations' }
        ]
      },
      {
        id: 'reg-compliance',
        title: 'Compliance',
        subcategories: [
          { id: 'reg-c-audit', title: 'Audits' },
          { id: 'reg-c-inspect', title: 'Inspections' },
          { id: 'reg-c-correct', title: 'Corrective Actions' },
          { id: 'reg-c-penalty', title: 'Penalties' }
        ]
      },
      {
        id: 'reg-standards',
        title: 'Standards',
        subcategories: [
          { id: 'reg-s-issue', title: 'Issuance' },
          { id: 'reg-s-update', title: 'Updates' },
          { id: 'reg-s-training', title: 'Training' },
          { id: 'reg-s-guidance', title: 'Guidance' }
        ]
      },
      {
        id: 'reg-monitoring',
        title: 'Monitoring',
        subcategories: [
          { id: 'reg-m-report', title: 'Reporting' },
          { id: 'reg-m-review', title: 'Review' },
          { id: 'reg-m-risk', title: 'Risk Assessment' },
          { id: 'reg-m-enforcement', title: 'Enforcement' }
        ]
      }
    ];
  }

  if (key.includes('other')) {
    return [
      {
        id: 'other-individual',
        title: 'Individuals',
        subcategories: [
          { id: 'other-i-local', title: 'Local' },
          { id: 'other-i-international', title: 'International' },
          { id: 'other-i-partner', title: 'Partners' },
          { id: 'other-i-donor', title: 'Donors' }
        ]
      },
      {
        id: 'other-private',
        title: 'Private Sector',
        subcategories: [
          { id: 'other-p-sme', title: 'SMEs' },
          { id: 'other-p-large', title: 'Large Companies' },
          { id: 'other-p-startup', title: 'Startups' },
          { id: 'other-p-investor', title: 'Investors' }
        ]
      },
      {
        id: 'other-public',
        title: 'Public Sector',
        subcategories: [
          { id: 'other-pb-federal', title: 'Federal' },
          { id: 'other-pb-regional', title: 'Regional' },
          { id: 'other-pb-city', title: 'City Admin' },
          { id: 'other-pb-woreda', title: 'Woreda' }
        ]
      },
      {
        id: 'other-ngo',
        title: 'NGOs',
        subcategories: [
          { id: 'other-n-local', title: 'Local NGOs' },
          { id: 'other-n-intl', title: 'International NGOs' },
          { id: 'other-n-community', title: 'Community Based' },
          { id: 'other-n-faith', title: 'Faith Based' }
        ]
      }
    ];
  }

  return [
    {
      id: 'cat-1',
      title: 'Category 1',
      subcategories: [
        { id: 'sub-1', title: 'Subcategory 1' },
        { id: 'sub-2', title: 'Subcategory 2' },
        { id: 'sub-3', title: 'Subcategory 3' },
        { id: 'sub-4', title: 'Subcategory 4' }
      ]
    }
  ];
};

const TypeRegionalTrendChart = ({ type, module }: { type: MasterType; module: 'project' | 'stakeholder' | 'infrastructure' }) => {
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  // 1. Fetch Categories for this Type
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [`${module}Categories`, type.id],
    queryFn: () =>
      masterCategoryApiService.getAll(module, {
        filter: { [`${module}type_id`]: type.id }
      }),
    enabled: !dummyEnabled
  });

  const dummyCategories = getDummyCategoriesForType(type.title);
  const categories = (dummyEnabled ? dummyCategories : categoriesData?.payload || []) as any[];

  // Add "All" option to filters
  const filterOptions = [
    { label: 'All', value: '' },
    ...categories.map((c: any) => ({ label: c.title, value: c.id }))
  ];

  // 2. State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // 3. Fetch Chart Data
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: [`${module}Chart`, type.id, selectedCategoryId],
    queryFn: () => {
      if (selectedCategoryId) {
        return projectGeneralAnalyticsService.projectSubcategoryMappingDepartment(module, selectedCategoryId, {});
      }
      return projectGeneralAnalyticsService.projectCategoryMappingDepartment(module, type.id, {});
    },
    // Always enabled since we handle both cases
    enabled: !dummyEnabled
  });

  const seed = hashString(`${type.id}:${selectedCategoryId || 'all'}`);
  const dummyRegions = [
    'FDRE',
    'Dire Dawa',
    'Southwest Ethiopia',
    'Benishangul',
    'Somali',
    'Harari',
    'Afar',
    'Sidama',
    'Addis Ababa',
    'Tigray',
    'Amhara',
    'Central Ethiopia',
    'South Ethiopia',
    'Oromia'
  ];

  const selectedCategory = dummyEnabled
    ? dummyCategories.find((c) => c.id === selectedCategoryId)
    : null;

  const dummySeriesNames = selectedCategoryId
    ? (selectedCategory?.subcategories?.slice(0, 4).map((s) => s.title) ?? [])
    : dummyCategories.slice(0, 4).map((c) => c.title);

  const dummySeries = dummySeriesNames.map((name, seriesIndex) => {
    const seriesSeed = hashString(`${seed}:${name}:${seriesIndex}:${type.title}`);
    const rand = mulberry32(seriesSeed);

    if (module === 'stakeholder') {
      const phase = rand() * Math.PI * 2;
      const amp = 1.6 + rand() * 1.8;
      const base = 1.2 + rand() * 1.6;
      return {
        name,
        data: dummyRegions.map((regionName, regionIndex) => {
          const r = mulberry32(hashString(`${seriesSeed}:${regionName}:${regionIndex}`));
          if (r() < 0.12) return 0;
          const wave = Math.sin(regionIndex * 0.55 + phase) * amp;
          const noise = (r() - 0.5) * 1.2;
          const raw = base + wave + noise;
          const value = Math.max(0, Math.min(5, Math.round(raw)));
          return value;
        })
      };
    }

    const base = 40 + Math.floor(rand() * 120);
    const amplitude = 20 + Math.floor(rand() * 80);
    const regionBoostBase = 0.75 + rand() * 0.8;

    return {
      name,
      data: dummyRegions.map((_, regionIndex) => {
        const regionName = dummyRegions[regionIndex];
        const regionSeed = hashString(`${seriesSeed}:${regionName}`);
        const r = mulberry32(regionSeed);

        const regionBoost = regionBoostBase + r() * 0.7;
        const noise = (r() - 0.5) * amplitude;
        const value = Math.max(0, Math.round((base + noise + regionIndex * 3) * regionBoost));
        return r() < 0.03 ? 0 : value;
      })
    };
  });

  const series = dummyEnabled ? dummySeries : chartData?.payload?.series || [];
  const regions = dummyEnabled ? dummyRegions : chartData?.payload?.departments || [];

  return (
    <RegionalTrendLineChart
      title={type.title}
      series={series}
      categories={regions}
      filterOptions={filterOptions}
      defaultFilter={selectedCategoryId}
      onFilterChange={setSelectedCategoryId}
      loading={!dummyEnabled && (isCategoriesLoading || isChartLoading)}
    />
  );
};

const getConfig = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('institution') || lowerName.includes('education')) return { icon: 'tabler:school', color: 'info' };
  if (lowerName.includes('contractor')) return { icon: 'tabler:helmet', color: 'warning' };
  if (lowerName.includes('consultant')) return { icon: 'tabler:briefcase', color: 'success' };
  if (lowerName.includes('association')) return { icon: 'tabler:users', color: 'primary' };
  return { icon: 'tabler:user', color: 'secondary' };
};

const StatCard = ({ title, count }: { title: string; count: number | string }) => {
  const { icon, color } = getConfig(title);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 3 }}>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={color as any}
          sx={{ mb: 3.5, width: 42, height: 42 }}
        >
          <Icon icon={icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard = ({ module, Layout, summaryService }: AnalyticsDashboardProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  const projectCounts = [24, 18, 12, 9, 31, 14, 20];
  const stakeholderCounts = [24, 110, 128, 18, 64, 11, 20, 7];
  const dummyTypeSummary =
    module === 'infrastructure' || module === 'project'
      ? {
        payload: [
          ...DUMMY_INFRA_PROJECT_TYPES.map((name, index) => ({
            name,
            count: projectCounts[index] ?? 0
          }))
        ]
      }
      : module === 'stakeholder'
        ? {
          payload: [
            ...DUMMY_STAKEHOLDER_TYPES.map((name, index) => ({
              name,
              count: stakeholderCounts[index] ?? 0
            }))
          ]
        }
        : {
        payload: [
          { name: 'Registered', count: 1280 },
          { name: 'Approved', count: 860 },
          { name: 'Rejected', count: 42 },
          { name: 'Pending', count: 190 }
        ]
      };

  const { data: typeSummaryDataFromApi, isLoading: isTypeSummaryLoading } = useQuery({
    queryKey: ['analytics', module, 'type-summary'],
    queryFn: () => summaryService.getTypeSummary({}),
    enabled: !dummyEnabled
  });

  const typeSummaryData = dummyEnabled ? dummyTypeSummary : typeSummaryDataFromApi;

  // Fetch all types for the module
  const { data: typesData, isLoading: isTypesLoading } = useQuery({
    queryKey: [`${module}Types`],
    queryFn: () => masterTypeApiService.getAll(module, {}),
    enabled: !dummyEnabled
  });

  const dummyTypes =
    module === 'stakeholder'
      ? DUMMY_STAKEHOLDER_TYPES.map((t) => makeDummyMasterType(module, t))
      : DUMMY_INFRA_PROJECT_TYPES.map((t) => makeDummyMasterType(module, t));

  const types: MasterType[] = dummyEnabled ? dummyTypes : typesData?.payload || [];
  const [isExporting, setIsExporting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePrintClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrint = (orientation: 'portrait' | 'landscape') => {
    handleClose();
    setIsExporting(true);

    const printSection = document.getElementById('print-section');
    if (!printSection) {
      setIsExporting(false);
      return;
    }

    // 1. Create a container for the print content
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';

    // 2. Clone the content
    // We use deep clone to get all children
    const clone = printSection.cloneNode(true) as HTMLElement;

    // 3. Handle Canvas elements (Charts often use Canvas)
    // cloneNode does not copy canvas content, so we must manually copy it
    const originalCanvases = printSection.querySelectorAll('canvas');
    const clonedCanvases = clone.querySelectorAll('canvas');

    originalCanvases.forEach((canvas, index) => {
      const clonedCanvas = clonedCanvases[index];
      const context = clonedCanvas.getContext('2d');
      if (context) {
        context.drawImage(canvas, 0, 0);
      }
    });

    // 4. Handle Form Inputs (Selects, TextFields)
    // cloneNode does not copy current values of inputs/selects
    const originalInputs = printSection.querySelectorAll('input, select, textarea');
    const clonedInputs = clone.querySelectorAll('input, select, textarea');

    originalInputs.forEach((input, index) => {
      const clonedInput = clonedInputs[index] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const original = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      clonedInput.value = original.value;

      // For checkboxes/radios
      if ((original as HTMLInputElement).checked !== undefined) {
        (clonedInput as HTMLInputElement).checked = (original as HTMLInputElement).checked;
      }
    });

    // Append clone to container
    printContainer.appendChild(clone);

    // Append container to body
    document.body.appendChild(printContainer);

    // 5. Inject Print Styles
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        /* Hide everything in body */
        body > * {
          display: none !important;
        }

        /* Show only our print container */
        body > #print-container {
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: auto !important;
          z-index: 9999 !important;
          background-color: white !important;
        }

        /* Ensure content inside is visible */
        #print-container * {
          visibility: visible !important;
        }
        
        /* Restore display for layout elements inside container */
        #print-container .MuiGrid-container {
          display: flex !important;
        }
        #print-container .MuiGrid-item {
          display: block !important;
        }
        #print-container .MuiCard-root {
           display: block !important;
           break-inside: avoid;
           page-break-inside: avoid;
           margin-bottom: 24px !important;
           box-shadow: none !important;
           border: 1px solid #e0e0e0 !important;
         }

         /* Expand Tables for Print */
         #print-container .MuiTableContainer-root {
            max-height: none !important;
            overflow: visible !important;
         }
 
         /* Hide elements marked as no-print */
        .no-print {
          display: none !important;
        }

        /* Orientation */
        @page {
          size: ${orientation};
          margin: 10mm;
        }
      }
    `;
    document.head.appendChild(style);

    // 6. Print and Cleanup
    // Small delay to ensure DOM is updated and styles applied
    setTimeout(() => {
      window.print();

      // Cleanup
      document.body.removeChild(printContainer);
      const printStyle = document.getElementById('print-styles');
      if (printStyle) {
        document.head.removeChild(printStyle);
      }
      setIsExporting(false);
    }, 500);
  };

  return (
    <Layout>
      <ApexChartWrapper>
        <Grid container spacing={6} ref={reportRef} id="print-section">
          {/* Header Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
              <Button
                variant="tonal"
                color="primary"
                startIcon={<Icon icon="tabler:printer" />}
                onClick={handlePrintClick}
                className="no-print"
              >
                Print
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handlePrint('portrait')}>Print Portrait</MenuItem>
                <MenuItem onClick={() => handlePrint('landscape')}>Print Landscape</MenuItem>
              </Menu>
              <Typography variant="body2" sx={{ alignSelf: 'center', fontWeight: 'bold' }}>Registered</Typography>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select value="2025">
                  {
                    generateYears(1990, new Date().getFullYear()).map((year, index) => (
                      <MenuItem value={year} key={index}>{year}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <Grid container spacing={4}>
              {isTypeSummaryLoading ? (
                Array.from(new Array(4)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ height: 120, p: 3 }}>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="rectangular" height={40} width="40%" sx={{ mt: 2 }} />
                    </Card>
                  </Grid>
                ))
              ) : (
                typeSummaryData?.payload?.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={3} key={item?.id || index}>
                    <StatCard title={item.name} count={item.count} />
                  </Grid>
                ))
              )}
              {!isTypeSummaryLoading && (!typeSummaryData?.payload || typeSummaryData.payload.length === 0) && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">No data available</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Dynamic Charts for each Type */}
          {isTypesLoading ? (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" p={4}>
                <Typography>Loading charts...</Typography>
              </Box>
            </Grid>
          ) : (
            types.map((type) => (
              <Grid item xs={12} key={type.id}>
                <TypeRegionalTrendChart type={type} module={module} />
              </Grid>
            ))
          )}
        </Grid>
      </ApexChartWrapper>
    </Layout>
  );
};

export default AnalyticsDashboard;
