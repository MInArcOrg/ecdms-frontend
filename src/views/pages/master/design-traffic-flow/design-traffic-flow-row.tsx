import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { DesignTrafficFlow } from "src/types/master/design-traffic-flow"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: DesignTrafficFlow
}

export const designTrafficFlowColumns = (
  onDetail: (designTrafficFlow: DesignTrafficFlow) => void,
  onEdit: (designTrafficFlow: DesignTrafficFlow) => void,
  onDelete: (id: string) => void,
  t: any,
  projectTypes: { value: string; label: string }[],
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: "title",
    headerName: t("master-data.design-traffic-flow.title"),
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
        {row.title}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "description",
    headerName: t("master-data.design-traffic-flow.description"),
    renderCell: ({ row }: CellType) => row.description,
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "project_type_id",
    headerName: t("master-data.design-traffic-flow.project-type"),
    renderCell: ({ row }: CellType) => {
      const projectType = projectTypes.find((type) => type.value === row.project_type_id)
      return projectType ? projectType.label : "Unknown"
    },
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
          model="DesignTrafficFlow"
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
            subject: "designtrafficflow",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "designtrafficflow",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
]

