export const resourceMasterModels = {
  quality: {
    model: 'Quality',
    dbModel: 'quality',
    title: 'quality',
    createTitle: 'create-quality',
    editTitle: 'edit-quality',
    fileType: 'QUALITY',
    flag: 'MATERIAL'
  },
  quantityMeasurementUnit: {
    model: 'QuantityMeasurementUnit',
    dbModel: 'quantitymeasurementunit',
    title: 'quantity-measurement-units',
    createTitle: 'create-quantity-measurement-unit',
    editTitle: 'edit-quantity-measurement-unit',
    fileType: 'QUANTITY_MEASUREMENT_UNIT',
    flag: 'PROFESSIONAL'
  },
  qualityMeasurementUnit: {
    model: 'QualityMeasurementUnit',
    dbModel: 'qualitymeasurementunit',
    title: 'quality-measurement-units',
    createTitle: 'create-quality-measurement-unit',
    editTitle: 'edit-quality-measurement-unit',
    fileType: 'QUALITY_MEASUREMENT_UNIT',
    flag: 'PROFESSIONAL'
  },
  supplierAddress: {
    model: 'SupplierAddress',
    dbModel: 'supplieraddress',
    title: 'supplier-address',
    createTitle: 'create-supplier-address',
    editTitle: 'edit-supplier-address',
    fileType: 'SUPPLIER_ADDRESS',
    flag: 'MATERIAL'
  },
  supplierName: {
    model: 'SupplierName',
    dbModel: 'suppliername',
    title: 'supplier-name',
    createTitle: 'create-supplier-name',
    editTitle: 'edit-supplier-name',
    fileType: 'SUPPLIER_NAME',
    flag: 'MATERIAL'
  },
  unitPrice: {
    model: 'UnitPrice',
    dbModel: 'unitprice',
    title: 'unit-price',
    createTitle: 'create-unit-price',
    editTitle: 'edit-unit-price',
    fileType: 'UNIT_PRICE',
    flag: 'MATERIAL'
  }
};
export type ResourceMasterModelKey = keyof typeof resourceMasterModels;

export type ResourceMasterModel = {
  model: string;
  dbModel: string;
  title: string;
  createTitle: string;
  editTitle: string;
  fileType: string;
  flag?: string;
};

export type ResourceMasterModels = {
  [K in ResourceMasterModelKey]: ResourceMasterModel;
};
