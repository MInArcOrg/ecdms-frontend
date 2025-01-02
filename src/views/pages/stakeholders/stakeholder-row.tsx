/* eslint-disable prettier/prettier */

import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Fragment } from "react";
import { Stakeholder } from "src/types/stakeholder";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: Stakeholder;
}

export const StakeholderRow = (
  onEdit: (stakeholders: Stakeholder) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  typeId: string
) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("stakeholder.columns.title"),
      field: "title",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            component={Link}
            href={`/stakeholders/${typeId}/details/${row.id}`}
            sx={{
              fontWeight: 500,
              textDecoration: "none",
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            {row?.trade_name}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("stakeholder.columns.tin"),
      field: "tin",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {row?.tin}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("common.table-columns.created-at"),
      field: "created_at",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {formatCreatedAt(row.created_at)}
          </Typography>
        );
      },
    },

    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: "actions",
      headerName: t("common.table-columns.actions"),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="Stakeholder"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
            title={""}
            postAction={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(row.id)}
            item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'stakeholder',
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'stakeholder'
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ] as GridColDef[];
