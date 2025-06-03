import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwayTrackRehabilitationOrRenewalDrawer from './railway-track-rehabilitation-or-renewal-drawer';
import { railwayTrackRehabilitationOrRenewalColumns } from './railway-track-rehabilitation-or-renewal-row';
import RailwayTrackRehabilitationOrRenewalCard from './railway-track-rehabilitation-or-renewal-card';

const RailwayTrackRehabilitationOrRenewalPage = ({ projectId, otherSubMenu }: { projectId: string; otherSubMenu?: DetailSubMenuItemChild }) => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<RailwayTrackRehabilitationOrRenewal | null>(null);
  const { data, refetch } = useQuery({
    queryKey: ['railway-track-rehabilitation-or-renewal', projectId],
    queryFn: () => projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().getAll(otherSubMenu?.apiRoute || '', { project_id: projectId })
  });

  const handleEdit = (item: RailwayTrackRehabilitationOrRenewal) => {
    setSelected(item);
    setDrawerOpen(true);
  };
  const handleCreate = () => {
    setSelected({ project_id: projectId } as RailwayTrackRehabilitationOrRenewal);
    setDrawerOpen(true);
  };
  const handleClose = () => {
    setDrawerOpen(false);
    setSelected(null);
  };
  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };
  const handleDetail = (item: RailwayTrackRehabilitationOrRenewal) => {
    setSelected(item);
    setDrawerOpen(true);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        {t('project.other.railway-track-rehabilitation-or-renewal.create')}
      </Button>
      <DataGrid
        autoHeight
        rows={data?.payload || []}
        columns={railwayTrackRehabilitationOrRenewalColumns(handleDetail, handleEdit, handleDelete, t, refetch)}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
      />
      <RailwayTrackRehabilitationOrRenewalDrawer
        open={drawerOpen}
        toggle={handleClose}
        refetch={refetch}
        rehabilitationOrRenewal={selected as RailwayTrackRehabilitationOrRenewal}
        projectId={projectId}
        otherSubMenu={otherSubMenu}
      />
    </Box>
  );
};

export default RailwayTrackRehabilitationOrRenewalPage;