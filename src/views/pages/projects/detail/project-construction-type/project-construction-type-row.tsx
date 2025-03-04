import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { ProjectConstructionType } from "src/types/project/project-construction-type"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: ProjectConstructionType
}

export const constructionTypeColumns = (
  onDetail: (constructionType: ProjectConstructionType) => void,
  onEdit: (constructionType: ProjectConstructionType) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.3,
    minWidth: 200,
    field: "construction_type",
    headerName: t("project.construction-type.construction-type"),
    renderCell: ({ row }: CellType) => (
      <Typography
        noWrap
        component={Button}
        onClick={() => onDetail(row)}
        sx={{
          fontWeight: 500,
          textDecoration: "none",
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
        }}
      >
        {row.construction_type}
      </Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 200,
    field: "description",
    headerName: t("project.construction-type.description"),
    renderCell: ({ row }: CellType) => row.description,
  },
  {
    flex: 0.2,
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
          model="ProjectConstructionType"
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
            subject: "projectconstructiontype",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "projectconstructiontype",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
]

