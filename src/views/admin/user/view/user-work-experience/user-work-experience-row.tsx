import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import { UserWorkExperience } from "src/types/admin/user";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: UserWorkExperience;
}

export const workexperienceColumns = (
  onEdit: (workexperience: UserWorkExperience) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 240,
    field: "company_name",
    headerName: t("department.user.workexperience.company-name"),
    renderCell: ({ row }: CellType) =>
      row.company_name || t("common.not-available"),
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: "position",
    headerName: t("department.user.workexperience.position"),
    renderCell: ({ row }: CellType) =>
      row.position || t("common.not-available"),
  },
  {
    flex: 0.15,
    minWidth: 160,
    field: "start_date",
    headerName: t("department.user.workexperience.start-date"),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.start_date),
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "end_date",
    headerName: t("department.user.workexperience.end-date"),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.end_date),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "created_at",
    headerName: t("common.created-at"),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at),
  },
  {
    minWidth: 150,
    sortable: false,
    field: "actions",
    headerName: t("common.table-columns.actions"),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="UserWorkExperience"
          model_id={row?.id || ""}
          refetchModel={() => {}}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || "")}
          item={row}
          deletePermissionRule={{
            action: "delete",
            subject: "userworkexperience",
          }}
          editPermissionRule={{
            action: "update",
            subject: "userworkexperience",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
