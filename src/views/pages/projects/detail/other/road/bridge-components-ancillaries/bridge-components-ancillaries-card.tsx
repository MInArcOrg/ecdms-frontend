'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import type { BridgeComponentAndAncillaries } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BridgeComponentsAncillariesCardProps {
  item: BridgeComponentAndAncillaries;
  refetch: () => void;
  onEdit: (item: BridgeComponentAndAncillaries) => void;
  onDelete: (id: string) => void;
  onDetail: (item: BridgeComponentAndAncillaries) => void;
}

const BridgeComponentsAncillariesCard: React.FC<BridgeComponentsAncillariesCardProps> = ({
  item,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(item)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {item?.bridge?.name ||  item?.bridge_id || item?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            Bridge Name: {item?.bridge?.name ||  item?.bridge_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expansion Joint Type: {item?.expansionJointType?.title || item?.expansion_joint_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Guard Railing Type: {item?.guardRailingType?.title || item?.guardRailType?.title || item?.guard_railing_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Abutment Bearing Type: {item?.abutmentBearingType?.title || item?.abutment_bearing_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Piers Bearing Type: {item?.piersBearingType?.title || item?.piers_bearing_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Surface Type: {item?.surfaceType?.title || item?.surface_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Remark: {item?.remark || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="BridgeComponentAndAncillaries"
          model_id={item.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'bridgecomponentandancillaries'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'bridgecomponentandancillaries'
          }}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
          item={item}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BridgeComponentsAncillariesCard;

