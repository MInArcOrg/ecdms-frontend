export interface ProjectResource {
    id?: string;
    parent_id?: string;
    resourcetype_id:string;
    resourcecategory_id:string;
    resourcesubcategory_id:string;
    project_id: string;
    resource_id: string;
    used_quantity?: number;
    unit_price?: number;
    period_from?: Date;
    period_until?: Date;
    data_source?: string;
    revision_no?: number;
    created_at?: Date;
    updated_at?: Date;
  }