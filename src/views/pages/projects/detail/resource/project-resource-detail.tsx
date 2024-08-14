import { Box, CardContent, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectResource } from 'src/types/project/project-resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import { formatCurrency } from 'src/utils/formatter/currency';

interface ResourceDetailProps {
  show: boolean;
  toggleDetail: () => void;
  projectResource: ProjectResource;
}

function ResourceDetail({ show, toggleDetail, projectResource }: ResourceDetailProps) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomSideDrawer
        title={`Q${projectResource.quarter}/${formatDate(projectResource.start, 'yyyy')} ${t('Resource')} ${t('Detail')}`}
        handleClose={toggleDetail}
        open={show}
      >
        {() => (
          <Box>
            <CardContent>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{`${t('Detail')} ${t('Resource')}`}</strong>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {t('Price')}
                  </Typography>
                </Box>
                <Divider />
                {[
                  { label: t('Manpower'), value: projectResource.manpower },
                  { label: t('Material'), value: projectResource.material },
                  { label: t('Machinery'), value: projectResource.machinery },
                  { label: t('Other Expense'), value: projectResource.other_expense },
                  { label: t('Subcontractor Expense'), value: projectResource.sub_contractor_cost },
                  { label: `${t('Subtotal')}`, value: projectResource.sub_total_expense, bold: true },
                  { label: t('Overhead Cost'), value: projectResource.over_head_cost },
                  { label: t('Profit - loss'), value: projectResource.profit_or_loss },
                  { label: `${t('Project')} ${t('Expense')}`, value: projectResource.project_expense, bold: true },
                  { label: `${t('Financial Performance')}`, value: projectResource.financial_performance },
                  { label: `${t('Physical Performance')}`, value: projectResource.physical_performance }
                ].map(({ label, value, bold }) => (
                  <Box key={label} display="flex" justifyContent="space-between" alignItems="center" m={2}>
                    <Typography fontWeight={bold ? 'bold' : 'light'} variant="subtitle1" fontSize="16px">
                      {label}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={bold ? 'bold' : 'light'} fontSize="16px">
                      {formatCurrency(Number(value))}
                    </Typography>
                  </Box>
                ))}
                <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {`${t('Reference')} ${t('File')}`}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <FileDrawer id={projectResource.id} type={uploadableProjectFileTypes.resource} />
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Box>
        )}
      </CustomSideDrawer>
    </Fragment>
  );
}

export default ResourceDetail;
