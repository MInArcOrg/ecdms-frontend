import { Box, Card, CardContent, ChipPropsColorOverrides, Collapse, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import CustomChip from 'src/@core/components/mui/chip';
import ActionRepliesComponent from './replies/action-replies';
import User from 'src/types/admin/user';
import UserProfileMd from 'src/views/admin/user/user-profile-md';
import { ActionReply, ModelAction } from 'src/types/general/model-action';
import { statusColors } from 'src/configs/action-status';
import Icon from 'src/@core/components/icon';

interface ActionItemProps {
  user: User;
  actionData: ModelAction;
  title: string;
  refetchAction: () => void;
  replyData: ActionReply;
}

const ActionItem: React.FC<ActionItemProps> = ({ user, actionData, title, refetchAction, replyData }) => {
  // const [isFileDetail, setIsFileDetail] = useState(false);
  // const [isActionReply, setIsActionReply] = useState(false);
  const [files, setFiles] = useState(false);
  const [replies, setReplies] = useState(false);

  // const toggleActionReply = () => {
  //   setIsActionReply(!isActionReply);
  // };

  // const toggleFileDetail = () => {
  //   setIsFileDetail(!isFileDetail);
  // };

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: '10px' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <UserProfileMd user={user as User} position={String(replyData?.type)} />
            <Box alignItems="end" display="flex" flexDirection="column" gap={3}>
              <Typography variant="body2">{moment(actionData?.time).fromNow()}</Typography>
              <CustomChip
                label={title}
                color={`${statusColors[replyData?.type || 'secondary']}` as keyof ChipPropsColorOverrides}
                size="small"
              />
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box
              onClick={() => {
                setFiles(!files);
                setReplies(false);
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Icon icon="tabler:file" /> <span>Files (0)</span>{' '}
              {files ? <Icon icon="tabler:chevron-up" fontSize="20" /> : <Icon icon="tabler:chevron-down" fontSize="20" />}
            </Box>
            <Box
              onClick={() => {
                setReplies(!replies);
                setFiles(false);
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Icon icon="tabler:message" /> <span>Replies (0)</span>{' '}
              {replies ? <Icon icon="tabler:chevron-up" fontSize="20" /> : <Icon icon="tabler:chevron-down" fontSize="20" />}
            </Box>
          </Box>
          <Collapse in={files} timeout="auto" unmountOnExit></Collapse>
          <Collapse in={replies} timeout="auto" unmountOnExit>
            <ActionRepliesComponent actionData={actionData} replyData={replyData} />
          </Collapse>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ActionItem;
