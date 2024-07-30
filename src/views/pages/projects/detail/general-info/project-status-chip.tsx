import React from 'react';
import CustomChip from 'src/@core/components/mui/chip';
import { STATUS_COLORS, STATUS_LABELS, StatusKey } from 'src/constants/status-constants';

interface ProjectStatusChipProps {
  data: string;
  onClick?: () => void;
}

const ProjectStatusChip: React.FC<ProjectStatusChipProps> = ({ data, onClick }) => {
  const status = (data in STATUS_COLORS ? data : 'NoStatus') as StatusKey;

  return (
    <CustomChip
      label={STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      rounded
      size="small"
      skin="light"
      sx={{
        '& .MuiChip-label': { textTransform: 'capitalize' },
        height: 15,
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  );
};

export default ProjectStatusChip;
