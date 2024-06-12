import { Box, CardContent, Drawer, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import {
  ACTION_APPROVED,
  ACTION_AUTHORIZED,
  ACTION_CHECKED,
  ACTION_REGISTERED,
  ACTION_REJECTED,
  REQUEST_APPROVE,
  REQUEST_AUTHORIZE,
  REQUEST_CHECK,
  isAllowedToApprove,
  isAllowedToAuthorize,
  isAllowedToCheck
} from 'src/configs/action-status';
import ActionForm from './action-form';
import ActionItem from './actionI-tem';
import { AuthorizationResponse } from 'src/types/general/model-action';

interface StatusSidebarProps {
  actions: AuthorizationResponse;
  show: boolean;
  toggleDrawer: () => void;
  model_id: string;
  model: any;
  refetchModel: () => void;
  refetchAction: () => void;
  title: string;
}

function StatusSidebar({ actions, show, toggleDrawer, model_id, model, refetchModel, refetchAction, title }: StatusSidebarProps) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Drawer
        anchor="right"
        open={show}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              sm: '100%',
              md: '36%',
              lg: '26%'
            },
            boxSizing: 'border-box'
          }
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: 1,
              p: 3
            }}
          >
            <Typography variant="body1">{t(title)}</Typography>
            <Icon icon="tabler:x"  cursor="pointer" onClick={toggleDrawer} />
          </Box>
          <CardContent>
            <ActionItem
              replyData={{ type: ACTION_REGISTERED, action_id: actions?.authorization_data?.registered_data?.by }}
              refetchAction={refetchModel}
              title={t('Registered Data')}
              user={actions?.authorization_data?.registered_data?.user}
              action={actions?.authorization_data?.registered_data}
            />

            {actions?.authorization_data?.checked_data?.by && (
              <div>
                <ActionItem
                  replyData={{ type: ACTION_CHECKED, action_id: actions?.authorization_data?.checked_data?.by }}
                  refetchAction={refetchModel}
                  title={t('Checked Data')}
                  user={actions?.authorization_data?.checked_data?.user}
                  action={actions?.authorization_data?.checked_data}
                />
              </div>
            )}

            {actions?.authorization_data?.approved_data?.by && (
              <div>
                <ActionItem
                  replyData={{ type: ACTION_APPROVED, action_id: actions?.authorization_data?.approved_data?.by }}
                  refetchAction={refetchModel}
                  title={t('Approved Data')}
                  user={actions?.authorization_data?.approved_data?.user}
                  action={actions?.authorization_data?.approved_data}
                />
              </div>
            )}

            {actions?.authorization_data?.authorized_data?.by && (
              <div>
                <ActionItem
                  replyData={{ type: ACTION_AUTHORIZED, action_id: actions?.authorization_data?.authorized_data?.by }}
                  refetchAction={refetchModel}
                  title={t('Authorized Data')}
                  user={actions?.authorization_data?.authorized_data?.user}
                  action={actions?.authorization_data?.authorized_data}
                />
              </div>
            )}

            {actions?.authorization_data?.rejected_data?.by && (
              <div>
                <ActionItem
                  replyData={{ type: ACTION_REJECTED, action_id: actions?.authorization_data?.rejected_data?.by }}
                  refetchAction={refetchModel}
                  title={t('Rejected Data')}
                  user={actions?.authorization_data?.rejected_data?.user}
                  action={actions?.authorization_data?.rejected_data}
                />
              </div>
            )}

            <Box sx={{ marginTop: '10px' }}>
              {isAllowedToCheck(actions?.status, actions?.authorization_data?.registered_data?.by) && (
                <ActionForm
                  actionType={REQUEST_CHECK}
                  toggleDrawer={toggleDrawer}
                  model_id={model_id}
                  model={model}
                  refetchAction={refetchAction}
                />
              )}
              {isAllowedToApprove(
                actions?.status,
                actions?.authorization_data?.registered_data?.by,
                actions?.authorization_data?.checked_data?.by
              ) && (
                <ActionForm
                  actionType={REQUEST_APPROVE}
                  toggleDrawer={toggleDrawer}
                  model_id={model_id}
                  model={model}
                  refetchAction={refetchAction}
                />
              )}
              {isAllowedToAuthorize(
                actions?.status,
                actions?.authorization_data?.registered_data?.by,
                actions?.authorization_data?.checked_data?.by,
                actions?.authorization_data?.approved_data?.by
              ) && (
                <ActionForm
                  actionType={REQUEST_AUTHORIZE}
                  toggleDrawer={toggleDrawer}
                  model_id={model_id}
                  model={model}
                  refetchAction={refetchAction}
                />
              )}
            </Box>
          </CardContent>
        </Box>
      </Drawer>
    </Fragment>
  );
}

export default StatusSidebar;
