import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { uploadableResourceFileTypes } from "src/services/utils/file-constants";
import { ProfessionalContact } from "src/types/resource";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface ContactCardProps {
  contact: ProfessionalContact;
  refetch: () => void;
  onEdit: (contact: ProfessionalContact) => void;
  onDelete: (id: string) => void;
  onDetail: (contact: ProfessionalContact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation();

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
              onClick={() => onDetail(contact)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {contact?.email}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("professional.contact.phone")}: {contact?.phone_no || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("professional.contact.website")}: {contact?.website || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={contact?.id || ""}
          type={uploadableResourceFileTypes.resource}
        />
        <ModelAction
          model="ProfessionalContact"
          model_id={contact?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "professionalcontact",
          }}
          editPermissionRule={{
            action: "update",
            subject: "professionalcontact",
          }}
          onEdit={() => onEdit(contact)}
          onDelete={() => onDelete(contact?.id || "")}
          item={contact}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ContactCard;
