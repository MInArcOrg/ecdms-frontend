import { Box, ChipPropsColorOverrides } from '@mui/material';
import React, { useState } from 'react';
import CustomChip from 'src/@core/components/mui/chip';
import { statusColors } from 'src/configs/action-status';
import modelActionApiService from 'src/services/model-action/model-action-service';
import ActionDetail from './action-detaill';
import { useQuery } from '@tanstack/react-query';
import { AuthorizationResponse } from 'src/types/general/model-action';

interface ModelActionProps {
  model: string;
  model_id: string;
  refetchModel: () => void;
  resubmit: () => void;
  title: string;
  postAction: () => void;
}

const ModelActionComponent: React.FC<ModelActionProps> = ({ model, model_id, refetchModel, resubmit, title, postAction }) => {
  const [show, setShowDrawer] = useState(false);
  const { data: actions, refetch } = useQuery({
    queryKey: ['model-action', model_id],
    queryFn: () => modelActionApiService.getByModelId(model_id, {})
  });
  const refetchData = () => {
    refetch();
    postAction();
    // refetchModel();
  };

  const toggleDrawer = () => {
    setShowDrawer(!show);
  };

  return (
    <React.Fragment>
      <ActionDetail
        show={show}
        toggleDrawer={toggleDrawer}
        model={model}
        refetchModel={refetchData}
        refetchAction={refetch}
        model_id={model_id}
        actions={actions?.payload as AuthorizationResponse}
        title={title}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        gap={2}
      >
        <CustomChip
          onClick={toggleDrawer}
          rounded
          size="small"
          label={actions?.payload?.status}
          color={statusColors[actions?.payload?.status || 'secondary'] as keyof ChipPropsColorOverrides}
          skin="light"
          sx={{
            '& .MuiChip-label': { textTransform: 'capitalize' },
            '&:hover': { color: '#fff' },
            cursor: 'pointer',
            height: 15
          }}
        />
        {/* {actions?.status === rejectedAction && (
          <span className='btn btn-sm btn-light ml-1' onClick={() => resubmit(model_id)}>
            Re-submit
          </span>
        )} */}
      </Box>
    </React.Fragment>
  );
};

export default ModelActionComponent;
