import { Box, Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { StakeholderLicense } from "src/types/stakeholder/stakeholder-license";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import SharedItemViewCard from "src/views/shared/listing/shared-item-view-card";

const StakeholderLicenseCard = ({
  stakeholderLicense,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}: {
  stakeholderLicense: StakeholderLicense;
  refetch: () => void;
  onEdit: (stakeholderLicense: StakeholderLicense) => void;
  onDelete: (id: string) => void;
  onDetail: (license: StakeholderLicense) => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <SharedItemViewCard
      createdAt={stakeholderLicense.created_at}
      t={t}
      actions={
        <>
          <FileDrawer
            id={stakeholderLicense.id}
            type={uploadableProjectFileTypes.license}
          />
          <ModelActionComponent
            model="License"
            model_id={stakeholderLicense.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title={stakeholderLicense.license_name}
            postAction={() => {}}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderLicense)}
            onDelete={() => onDelete(stakeholderLicense.id)}
            editPermissionRule={{
              action: "update",
              subject: "license",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "license",
            }}
            item={stakeholderLicense}
            options={[]}
          />
        </>
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          onClick={() => onDetail(stakeholderLicense)}
          sx={{ cursor: "pointer" }}
        >
          {stakeholderLicense.license_name}
        </Typography>
        {stakeholderLicense.license_number && (
          <Chip
            label={stakeholderLicense.license_number}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center">
          <Icon icon="mdi:calendar-blank" fontSize={20} color="action" />
          {stakeholderLicense.issue_date && (
            <Typography variant="body2" color="textSecondary" ml={1} mr={3}>
              {t("stakeholder.stakeholder-license.form.issue-date")}:{" "}
              {getDynamicDate(
                i18n,
                stakeholderLicense?.issue_date as string,
              ).toDateString()}
            </Typography>
          )}
          {stakeholderLicense.expire_date && (
            <Typography variant="body2" color="textSecondary">
              {t("stakeholder.stakeholder-license.form.expire-date")}:{" "}
              {getDynamicDate(
                i18n,
                stakeholderLicense?.expire_date as string,
              ).toDateString()}
            </Typography>
          )}
        </Box>
        {stakeholderLicense.license_type && (
          <Typography variant="body2" color="textSecondary">
            {t("stakeholder.stakeholder-license.form.license-type")}:{" "}
            {stakeholderLicense.license_type}
          </Typography>
        )}
        {stakeholderLicense.license_category && (
          <Typography variant="body2" color="textSecondary">
            {t("stakeholder.stakeholder-license.form.license-category")}:{" "}
            {stakeholderLicense.license_category}
          </Typography>
        )}
        {stakeholderLicense.license_scope && (
          <Typography variant="body2" color="textSecondary">
            {t("stakeholder.stakeholder-license.form.license-scope")}:{" "}
            {stakeholderLicense.license_scope}
          </Typography>
        )}
        {stakeholderLicense.licensing_body && (
          <Typography variant="body2" color="textSecondary">
            {t("stakeholder.stakeholder-license.form.licensing-body")}:{" "}
            {stakeholderLicense.licensing_body}
          </Typography>
        )}
        {stakeholderLicense.remark && (
          <Typography variant="body2" color="textSecondary">
            {t("stakeholder.stakeholder-license.form.remark")}:{" "}
            {stakeholderLicense.remark}
          </Typography>
        )}
      </Box>
    </SharedItemViewCard>
  );
};

export default StakeholderLicenseCard;
