import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, Collapse, Divider, Icon, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CustomChip from 'src/@core/components/mui/chip';
import moment from 'moment';
import ActionReply from './action-replies';
import { rejectedAction, statusColor } from 'src/configs/action-status';

interface ActionData {
  id: string;
  by: string;
  user: User;
  time: string;
}

interface ReplyData {
  type: string;
  action_id: string;
}

interface ActionItemProps {
  user: User;
  action: ActionData;
  title: string;
  refetchAction: () => void;
  replyData: ReplyData;
}

const ActionItem: React.FC<ActionItemProps> = ({ user, action, title, refetchAction, replyData }) => {
  const [isFileDetail, setIsFileDetail] = useState(false);
  const [isActionReply, setIsActionReply] = useState(false);
  const [files, setFiles] = useState(false);
  const [replies, setReplies] = useState(false);

  const toggleActionReply = () => {
    setIsActionReply(!isActionReply);
  };

  const toggleFileDetail = () => {
    setIsFileDetail(!isFileDetail);
  };

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: '10px' }}>
        <CardContent>
          <Box display='flex' justifyContent='space-between'>
            <AvatarWithTitle user={user} actionType={replyData?.type} />
            <Box alignItems='end' display='flex' flexDirection='column' gap={3}>
              <Typography variant='body2'>{moment(action?.time).fromNow()}</Typography>
              <CustomChip label={title} color={`${statusColor[replyData?.type]}`} size='small' />
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Box display='flex' justifyContent='space-between' mb={3}>
            <Box
              onClick={() => {
                setFiles(!files);
                setReplies(false);
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Icon icon='tabler:file' /> <span>Files (0)</span>{' '}
              {files ? <Icon icon='tabler:chevron-up' size='20' /> : <Icon icon='tabler:chevron-down' size='20' />}
            </Box>
            <Box
              onClick={() => {
                setReplies(!replies);
                setFiles(false);
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Icon icon='tabler:message' /> <span>Replies (0)</span>{' '}
              {replies ? <Icon icon='tabler:chevron-up' size='20' /> : <Icon icon='tabler:chevron-down' size='20' />}
            </Box>
          </Box>
          <Collapse in={files} timeout='auto' unmountOnExit></Collapse>
          <Collapse in={replies} timeout='auto' unmountOnExit>
            <ActionReply replyData={replyData} action={action} />
          </Collapse>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};



export default ActionItem;
