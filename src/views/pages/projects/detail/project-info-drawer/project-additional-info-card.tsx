import React, { useState } from 'react';
import { Card, CardActions, CardContent, Grid, IconButton, Box, Typography } from '@mui/material';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-infos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';

interface ProjectAdditionalInfoCardProps {
  projectInfo: ProjectAdditionalInfo;
  onDelete: (infoId: string) => void;
  onEdit: (projectInfo: ProjectAdditionalInfo) => void;
  refetch: () => void;
  t: (key: string) => string;
}

const ProjectAdditionalInfoCard: React.FC<ProjectAdditionalInfoCardProps> = ({
  projectInfo,
  onDelete,
  onEdit,
  refetch,
  t
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    onDelete(projectInfo.id);
    refetch();
    setOpenDialog(false); 
  };

  const handleDeleteClick = () => {
    setOpenDialog(true); 
  };

  const handleCancel = () => {
    setOpenDialog(false); 
  };

  return (
    <> 
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{projectInfo.reason}</Typography>
            
            <Typography>
          <span style={{ fontWeight: 'bold' }}>Status: </span>
          <Typography sx={{ color: 'primary.main', display: 'inline' }}>
            {projectInfo.project_status}
          </Typography>
        </Typography>
            
            <Typography >
            <span style={{ fontWeight: 'bold' }}>Work Accident Number:</span>
              {projectInfo.work_accident_number}
            </Typography>
            
            <Typography>
            <span style={{ fontWeight: 'bold' }}>  Created At:</span>
            {new Date(projectInfo.created_at).toLocaleString()}
            </Typography>
          </Box>
          

            </Grid>
            <Grid item>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={() => onEdit(projectInfo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteClick} sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={openDialog}
        handleClose={handleCancel}
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ProjectAdditionalInfoCard;
