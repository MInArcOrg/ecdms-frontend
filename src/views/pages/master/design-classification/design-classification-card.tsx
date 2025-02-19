import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { DesignClassification } from "src/types/master/design-classification"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface DesignClassificationCardProps {
    designClassification: DesignClassification
    refetch: () => void
    onEdit: (designClassification: DesignClassification) => void
    onDelete: (id: string) => void
    onDetail: (designClassification: DesignClassification) => void
    projectTypes: { value: string; label: string }[]
}

const DesignClassificationCard: React.FC<DesignClassificationCardProps> = ({
    designClassification,
    refetch,
    onEdit,
    onDelete,
    onDetail,
    projectTypes,
}) => {
    const { t } = useTranslation()

    const projectType = projectTypes.find((type) => type.value === designClassification.project_type_id)

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight="bold">
                        <Typography
                            noWrap
                            component={Button}
                            onClick={() => onDetail(designClassification)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: "none",
                                color: "text.secondary",
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            {designClassification.title}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t("master-data.design-classification.description")}: {designClassification.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("master-data.design-classification.project-type")}: {projectType ? projectType.label : "Unknown"}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
                <FileDrawer id={designClassification?.id || ""} type={uploadableResourceFileTypes.design_classification} />
                <ModelAction
                    model="DesignClassification"
                    model_id={designClassification?.id || ""}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    deletePermissionRule={{
                        action: "delete",
                        subject: "designclassification",
                    }}
                    editPermissionRule={{
                        action: "edit",
                        subject: "designclassification",
                    }}
                    onEdit={() => onEdit(designClassification)}
                    onDelete={() => onDelete(designClassification?.id || "")}
                    item={designClassification}
                    options={[]}
                />
            </CardActions>
        </Card>
    )
}

export default DesignClassificationCard

