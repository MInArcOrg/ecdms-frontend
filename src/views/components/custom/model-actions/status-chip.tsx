import React from 'react';
import CustomChip from 'src/@core/components/mui/chip';
import {
    resolveStatus,
    statusColors,
    ACTION_STATUS,
} from 'src/configs/action-status';

interface StatusChipProps {
    status?: string;
    onClick?: () => void;
}

const StatusChip = ({ status, onClick }: StatusChipProps) => {
    // Resolve status safely from backend
    const resolvedStatus = resolveStatus(status);

    // Get the chip color
    const color = statusColors[resolvedStatus];

    // Use 'light' skin for all except DEFAULT (prevents crash)
    const skin = resolvedStatus === ACTION_STATUS.DEFAULT ? undefined : 'light';

    return (
        <CustomChip
            onClick={onClick}
            rounded
            size="small"
            label={resolvedStatus.toLowerCase()}
            color={color}
            skin={skin}
            sx={{
                '& .MuiChip-label': { textTransform: 'capitalize' },
                '&:hover': { color: '#fff' },
                cursor: 'pointer',
                height: 15,
            }}
        />
    );
};

export default StatusChip;
