import { Icon } from '@iconify/react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import MuiTimeline from '@mui/lab/Timeline';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import i18n from 'src/configs/i18n';
import { ProjectTime } from 'src/types/project/project-time';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';

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
  data: ProjectTime;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ data }) => {
  const timelineItems = [
    { date: data?.contract_signing_date, label: 'Contract Signing Date' },
    { date: data?.site_handover_date, label: 'Site Handover Date' },
    { date: data?.commencement_date, label: 'Commencement Date' }
  ];

  return (
    <Timeline>
      {timelineItems.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary" variant={`${index === 0 ? 'filled' : 'outlined'}`} />
            {index < timelineItems.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
            <Box display="flex" alignContent="center" alignItems="center">
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                <span>{item.date ? getDynamicDate(i18n, item.date).toDateString() : 'N/A'}</span>
                <Icon icon="tabler:arrow-right" fontSize={20} />{' '}
              </Typography>
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineSection;
