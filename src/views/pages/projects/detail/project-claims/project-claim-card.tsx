import { Button, Card, CardContent, Grid, Typography, CardHeader, IconButton } from '@mui/material';
import { ProjectClaim } from 'src/types/project/project-claim';
import { formatCreatedAt } from 'src/utils/formatter/date';
import { Icon } from '@iconify/react';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProjectClaimCardProps {
    projectClaim: ProjectClaim;
    onDetail: (projectClaim: ProjectClaim) => void;
    onEdit: (projectClaim: ProjectClaim) => void;
    onDelete: (id: string) => void;
    refetch: () => void;
}

const ProjectClaimCard: React.FC<ProjectClaimCardProps> = ({ projectClaim, onDetail, onEdit, onDelete }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' }
                        }}
                        onClick={() => onDetail(projectClaim)}
                    >
                        {projectClaim.title}
                    </Typography>
                }
                action={
                    <RowOptions
                        onEdit={() => onEdit(projectClaim)}
                        onDelete={() => onDelete(projectClaim?.id || '')}
                        item={projectClaim}
                        deletePermissionRule={{
                            action: 'delete',
                            subject: 'claim'
                        }}
                        editPermissionRule={{
                            action: 'update',
                            subject: 'claim'
                        }}
                        options={[]}
                    />
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                            {projectClaim.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" color="text.disabled">
                            {projectClaim.created_at ? formatCreatedAt(projectClaim.created_at) : ''}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProjectClaimCard;
