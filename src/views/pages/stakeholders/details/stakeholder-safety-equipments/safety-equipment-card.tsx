import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { SafetyEquipment } from "src/types/stakeholder/stakeholder-safety-equipment"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface SafetyEquipmentCardProps {
  equipment: SafetyEquipment
  refetch: () => void
  onEdit: (equipment: SafetyEquipment) => void
  onDelete: (id: string) => void
  onDetail: (equipment: SafetyEquipment) => void
}

const SafetyEquipmentCard: React.FC<SafetyEquipmentCardProps> = ({
  equipment,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(equipment)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {equipment.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.safety-equipment.serial-no")}: {equipment.serial_no || t("common.not-available")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.safety-equipment.brand-name")}: {equipment.brand_name || t("common.not-available")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.safety-equipment.model")}: {equipment.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.safety-equipment.year")}: {equipment.year || t("common.not-available")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.safety-equipment.quantity")}: {equipment.quantity || t("common.not-available")}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="SafetyEquipment"
          model_id={equipment?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "safetyequipment",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "safetyequipment",
          }}
          onEdit={() => onEdit(equipment)}
          onDelete={() => onDelete(equipment?.id || "")}
          item={equipment}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default SafetyEquipmentCard

