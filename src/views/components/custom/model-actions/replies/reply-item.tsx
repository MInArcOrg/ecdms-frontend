import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';
import { ActionReply } from 'src/types/general/model-action';
import { formatRelative } from 'src/utils/formatter/date';
import UserProfileSmall from 'src/views/admin/user/user-profile-small';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(1, 0)
}));

const Content = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flexGrow: 1
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const Time = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1)
}));

interface ReplyProps {
  actionReply: ActionReply;
}

const Reply: React.FC<ReplyProps> = ({ actionReply }) => {
  return (
    <Container>
      <Content>
        <Header>
          <UserProfileSmall user={actionReply.user} />
          <Time variant="body2">{formatRelative(actionReply.created_at)}</Time>
        </Header>
        <Text variant="body2">{actionReply.content}</Text>
      </Content>
    </Container>
  );
};

export default Reply;
