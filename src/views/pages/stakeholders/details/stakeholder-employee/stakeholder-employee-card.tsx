import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import type { StakeholderEmployee } from "src/types/stakeholder/stakeholder-employee";
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department";
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface EmployeeCardProps {
  employee: StakeholderEmployee;
  refetch: () => void;
  onEdit: (employee: StakeholderEmployee) => void;
  onDelete: (id: string) => void;
  onDetail: (employee: StakeholderEmployee) => void;
  departments: StakeholderDepartment[];
  positions: StakeholderPosition[];
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  departments,
  positions,
}) => {
  const { t } = useTranslation();

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : "N/A";
  };

  const getPositionName = (positionId: string) => {
    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : "N/A";
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(employee)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {`${employee.first_name} ${employee.last_name}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.employee.department")}:{" "}
            {getDepartmentName(employee.stakeholder_department_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.employee.position")}:{" "}
            {getPositionName(employee.stakeholder_position_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.employee.email")}:{" "}
            {employee.email || t("common.not-available")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.employee.phone")}:{" "}
            {employee.phone || t("common.not-available")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.employee.nationalIdNo")}:{" "}
            {employee.national_id_no || t("common.not-available")}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="StakeholderEmployee"
          model_id={employee?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "stakeholderemployee",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "stakeholderemployee",
          }}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee?.id || "")}
          item={employee}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default EmployeeCard;
