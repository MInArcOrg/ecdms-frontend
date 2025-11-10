// ** MUI Imports
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// ** Custom Component Import
import { Box } from '@mui/system';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import CustomChip from 'src/@core/components/mui/chip';

const TypeCardStat = (props: any) => {
  // ** Props
  const {
    sx,
    stats,
    title,
    chipText,
    subtitle,
    avatarIcon,
    iconSize = 24,
    avatarSize = 42,
    chipColor = 'primary',
    avatarColor = 'primary'
  } = props;
  const RenderChip = chipColor === 'default' ? Chip : CustomChip;

  return (
    <Box >
      <CustomAvatar skin="light" variant="rounded" color={avatarColor} sx={{ mb: 3.5, width: avatarSize, height: avatarSize }}>
        {title[0]}
      </CustomAvatar>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, color: 'text.disabled' }}>
        {'commenced this year'}
      </Typography>
      <Typography sx={{ mb: 3.5, color: 'text.secondary' }}>{stats}</Typography>
      {/* <RenderChip
          size='small'
          label={chipText}
          color={chipColor}
          {...(chipColor === 'default'
            ? { sx: { borderRadius: '4px', color: 'text.secondary' } }
            : { rounded: true, skin: 'light' })}
        /> */}
      <Box
        sx={{
          display: 'flex',
          '& svg': { mr: 1 },
          alignItems: 'center',
          '& > *': { color: chipText < 0 ? 'error.main' : 'success.main' }
        }}
      >
        <Icon fontSize="1.25rem" icon={chipText < 0 ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
        <Typography sx={{ fontWeight: 500 }}>
          {`${chipText} `}
          <Typography sx={{ mb: 1, color: 'text.disabled' }}>from last year</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default TypeCardStat;
