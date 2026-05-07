import { Box, CardContent, Drawer, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import {

  ACTION_STATUS,
  isAllowedToApprove,
  isAllowedToAuthorize,
  isAllowedToCheck,
  REQUESTS
} from 'src/configs/action-status';
import ActionForm from './action-form';
import ActionItem from './action-item';
import { ActionReply, AuthorizationResponse } from 'src/types/general/model-action';
import User from 'src/types/admin/user';

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
            <Icon icon="tabler:x" cursor="pointer" onClick={toggleDrawer} />
          </Box>
          <CardContent>
            <ActionItem
              replyData={
                {
                  type: ACTION_STATUS.REGISTERED,
                  actionstate_id: actions?.authorization_data?.registered_data?.user_id
                } as ActionReply
              }
              refetchAction={refetchModel}
              title={t('model-action.registered-data')}
              user={actions?.authorization_data?.registered_data?.user as User}
              actionData={actions?.authorization_data?.registered_data}
            />

            {actions?.authorization_data?.checked_data?.user_id && (
              <div>
                <ActionItem
                  replyData={
                    {
                      type: ACTION_STATUS.CHECKED,
                      actionstate_id: actions?.authorization_data?.checked_data?.user_id
                    } as ActionReply
                  }
                  refetchAction={refetchModel}
                  title={t('model-action.checked-data')}
                  user={actions?.authorization_data?.checked_data?.user as User}
                  actionData={actions?.authorization_data?.checked_data}
                />
              </div>
            )}

            {actions?.authorization_data?.approved_data?.user_id && (
              <div>
                <ActionItem
                  replyData={
                    {
                      type: ACTION_STATUS.APPROVED,
                      actionstate_id: actions?.authorization_data?.approved_data?.user_id
                    } as ActionReply
                  }
                  refetchAction={refetchModel}
                  title={t('model-action.approved-data')}
                  user={actions?.authorization_data?.approved_data?.user as User}
                  actionData={actions?.authorization_data?.approved_data}
                />
              </div>
            )}

            {actions?.authorization_data?.authorized_data?.user_id && (
              <div>
                <ActionItem
                  replyData={
                    {
                      type: ACTION_STATUS.AUTHORIZED,
                      actionstate_id: actions?.authorization_data?.authorized_data?.user_id
                    } as ActionReply
                  }
                  refetchAction={refetchModel}
                  title={t('model-action.authorized-data')}
                  user={actions?.authorization_data?.authorized_data?.user as User}
                  actionData={actions?.authorization_data?.authorized_data}
                />
              </div>
            )}

            {actions?.authorization_data?.rejected_data?.user_id && (
              <div>
                <ActionItem
                  replyData={
                    {
                      type: ACTION_STATUS.REJECTED,
                      actionstate_id: actions?.authorization_data?.rejected_data?.user_id
                    } as ActionReply
                  }
                  refetchAction={refetchModel}
                  title={t('model-action.rejected-data')}
                  user={actions?.authorization_data?.rejected_data?.user as User}
                  actionData={actions?.authorization_data?.rejected_data}
                />
              </div>
            )}
            {
              actions?.status === ACTION_STATUS.DEFAULT && (
                <div>
                  <ActionItem
                    replyData={
                      {
                        type: ACTION_STATUS.DEFAULT,
                        actionstate_id: actions?.authorization_data?.default_data?.user_id
                      } as ActionReply
                    }
                    refetchAction={refetchModel}
                    title={t('model-action.default-data')}
                    user={actions?.authorization_data?.default_data?.user as User}
                    actionData={actions?.authorization_data?.default_data}
                  />
                </div>
              )
            }
            <Box sx={{ marginTop: '10px' }}>
              {isAllowedToCheck(actions?.status, actions?.authorization_data?.registered_data?.user_id) && (
                <ActionForm
                  actionType={REQUESTS.CHECK}
                  toggleDrawer={toggleDrawer}
                  model_id={model_id}
                  model={model}
                  refetchAction={refetchAction}
                />
              )}
              {isAllowedToApprove(
                actions?.status,
                actions?.authorization_data?.registered_data?.user_id,
                actions?.authorization_data?.checked_data?.user_id
              ) && (
                  <ActionForm
                    actionType={REQUESTS.APPROVE}
                    toggleDrawer={toggleDrawer}
                    model_id={model_id}
                    model={model}
                    refetchAction={refetchAction}
                  />
                )}
              {isAllowedToAuthorize(
                actions?.status,
                actions?.authorization_data?.registered_data?.user_id,
                actions?.authorization_data?.checked_data?.user_id,
                actions?.authorization_data?.approved_data?.user_id
              ) && (
                  <ActionForm
                    actionType={REQUESTS.AUTHORIZE}
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