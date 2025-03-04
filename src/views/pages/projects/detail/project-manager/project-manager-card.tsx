import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { ProjectManager } from "src/types/project/project-manager"
import type { Stakeholder } from "src/types/stakeholder"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface ManagerCardProps {
    manager: ProjectManager
    refetch: () => void
    onEdit: (manager: ProjectManager) => void
    onDelete: (id: string) => void
    onDetail: (manager: ProjectManager) => void
    stakeholders: Stakeholder[]
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, refetch, onEdit, onDelete, onDetail, stakeholders }) => {
    const { t } = useTranslation()

    const getStakeholderName = (stakeholderId: string) => {
        const stakeholder = stakeholders.find((s) => s.id === stakeholderId)
        return stakeholder ? stakeholder.trade_name : "N/A"
    }

    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h5" fontWeight="bold">
                        <Typography
                            noWrap
                            component={Button}
                            onClick={() => onDetail(manager)}
                            sx={{
                                fontWeight: 500,
                                textDecoration: "none",
                                color: "text.secondary",
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            {`${manager.first_name} ${manager.last_name}`}
                        </Typography>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" flexDirection="column" gap={1} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t("project.project-manager.position")}: {manager.position || t("common.not-available")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("project.project-manager.email")}: {manager.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("project.project-manager.phone")}: {manager.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("project.project-manager.stakeholder")}: {getStakeholderName(manager.stakeholder_id)}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
                <ModelAction
                    model="ProjectManager"
                    model_id={manager?.id || ""}
                    refetchModel={refetch}
                    resubmit={() => refetch()}
                    title=""
                    postAction={() => refetch()}
                />
                <RowOptions
                    deletePermissionRule={{
                        action: "delete",
                        subject: "projectmanager",
                    }}
                    editPermissionRule={{
                        action: "edit",
                        subject: "projectmanager",
                    }}
                    onEdit={() => onEdit(manager)}
                    onDelete={() => onDelete(manager?.id || "")}
                    item={manager}
                    options={[]}
                />
            </CardActions>
        </Card>
    )
}

export default ManagerCard

