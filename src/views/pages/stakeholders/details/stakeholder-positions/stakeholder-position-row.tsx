import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions"
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: StakeholderPosition
}

export const positionColumns = (
  onDetail: (position: StakeholderPosition) => void,
  onEdit: (position: StakeholderPosition) => void,
  onDelete: (id: string) => void,
  t: any,
  departments: StakeholderDepartment[],
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t("stakeholder.position.name"),
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
        {row.name}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: "stakeholder_department_id",
    headerName: t("stakeholder.position.parent-department"),
    renderCell: ({ row }: CellType) => {
      const parentDepartment = departments.find((d) => d.id === row.stakeholder_department_id)
      return parentDepartment ? parentDepartment.name : t("common.not-available")
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "required_education",
    headerName: t("stakeholder.position.required-education"),
    renderCell: ({ row }: CellType) => row.required_education || t("common.not-available"),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "required_work_experience",
    headerName: t("stakeholder.position.required-work-experience"),
    renderCell: ({ row }: CellType) => row.required_work_experience || t("common.not-available"),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "salary",
    headerName: t("stakeholder.position.salary"),
    renderCell: ({ row }: CellType) => row.salary || t("common.not-available"),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "no_of_professionals",
    headerName: t("stakeholder.position.no-of-professionals"),
    renderCell: ({ row }: CellType) => row.no_of_professionals || t("common.not-available"),
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
          model="StakeholderPosition"
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
            subject: "stakeholderposition",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "stakeholderposition",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
]

