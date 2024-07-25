import React from 'react';
import { Box, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import MuiTimeline from '@mui/lab/Timeline';
import { styled } from '@mui/system';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import ProjectStatusChip from '../general-info/project-status-chip';
import { ProjectStatus } from 'src/types/project';

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
});

interface TimelineSectionProps {
  data: ProjectStatus[];
  onStatusClick: (item: ProjectStatus) => void;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ data, onStatusClick }) => {
  const { t } = useTranslation();

  return (
    <Timeline>
      {data.map((item, index) => (
        <TimelineItem key={item.id}>
          <TimelineSeparator>
            <TimelineDot color='primary' variant={`${index === 0 ? 'filled' : 'outlined'}`} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
            <Box display='flex' alignContent='center' alignItems='center'>
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                <span>{t('date_format', { date: new Date(item.createdAt).toDateString() })}</span>
                <Icon icon='tabler:arrow-right' fontSize={20} />{' '}
              </Typography>

              <ProjectStatusChip
                data={item.status.title}
                onClick={() => onStatusClick(item)}
              />
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineSection;
