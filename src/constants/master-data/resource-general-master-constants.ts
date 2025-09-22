export const resourceMasterModels = {
  quantityMeasurementUnit: {
    model: "QuantityMeasurementUnit",
    dbModel: "quantitymeasurementunit",
    title: "quantity-measurement-units",
    createTitle: "create-quantity-measurement-unit",
    editTitle: "edit-quantity-measurement-unit",
    fileType: "QUANTITY_MEASUREMENT_UNIT",
  },
  qualityMeasurementUnit: {
    model: "QualityMeasurementUnit",
    dbModel: "qualitymeasurementunit",
    title: "quality-measurement-units",
    createTitle: "create-quality-measurement-unit",
    editTitle: "edit-quality-measurement-unit",
    fileType: "QUALITY_MEASUREMENT_UNIT",
  },
};
export type ResourceMasterModelKey = keyof typeof resourceMasterModels;

export type ResourceMasterModel = {
  model: string;
  dbModel: string;
  title: string;
  createTitle: string;
  editTitle: string;
  fileType: string;
};

export type ResourceMasterModels = {
  [K in ResourceMasterModelKey]: ResourceMasterModel;
};
