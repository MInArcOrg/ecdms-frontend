import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { Professional } from "src/types/resource/index";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { useRouter } from "next/router";
import Link from "next/link";

interface CellType {
  row: Professional;
}

const NameCell = ({ row }: CellType) => {
  const router = useRouter();
  const { typeId } = router.query;

  return (
    <Typography
      component={Link}
      href={`/resources/${typeId}/details/${row.id}/general-info`}
      sx={{
        fontWeight: 500,
        textDecoration: "none",
        color: "text.secondary",
        "&:hover": { color: "primary.main" },
      }}
    >
      {`${row.first_name} ${row.last_name}`}
    </Typography>
  );
};

export const professionalColumns = (
  onEdit: (professional: Professional) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: "name",
    headerName: t("resources.professional.name"),
    renderCell: ({ row }: CellType) => <NameCell row={row} />,
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "national_id_no",
    headerName: t("resources.professional.nationalIdNo"),
    renderCell: ({ row }: CellType) => row.national_id_no,
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "email",
    headerName: t("resources.professional.email"),
    renderCell: ({ row }: CellType) => row.email,
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "phone_no",
    headerName: t("resources.professional.phoneNo"),
    renderCell: ({ row }: CellType) => row.phone_no,
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "gender",
    headerName: t("resources.professional.gender"),
    renderCell: ({ row }: CellType) => row.gender,
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
          model="Professional"
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
            subject: "professional",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "professional",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
