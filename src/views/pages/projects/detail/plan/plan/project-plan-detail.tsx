import { Box, CardContent, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectPlan } from 'src/types/project/project-plan';
import FileDrawer from 'src/views/components/custom/files-drawer';
import { formatCurrency } from 'src/utils/formatter/currency';

interface PlanDetailProps {
  show: boolean;
  toggleDetail: () => void;
  projectPlan: ProjectPlan;
}

function PlanDetail({ show, toggleDetail, projectPlan }: PlanDetailProps) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomSideDrawer
        title={`Q${projectPlan.quarter}/${formatDate(projectPlan.start, 'yyyy')} ${t('Plan')} ${t('Detail')}`}
        handleClose={toggleDetail}
        open={show}
      >
        {() => (
          <Box>
            <CardContent>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{`${t('Detail')} ${t('Plan')}`}</strong>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {t('Price')}
                  </Typography>
                </Box>
                <Divider />
                {[
                  { label: t('Manpower'), value: projectPlan.manpower },
                  { label: t('Material'), value: projectPlan.material },
                  { label: t('Machinery'), value: projectPlan.machinery },
                  { label: t('Other Expense'), value: projectPlan.other_expense },
                  { label: t('Subcontractor Expense'), value: projectPlan.sub_contractor_cost },
                  { label: `${t('Subtotal')}`, value: projectPlan.sub_total_expense, bold: true },
                  { label: t('Overhead Cost'), value: projectPlan.over_head_cost },
                  { label: t('Profit - loss'), value: projectPlan.profit_or_loss },
                  { label: `${t('Project')} ${t('Expense')}`, value: projectPlan.project_expense, bold: true },
                  { label: `${t('Financial Performance')}`, value: projectPlan.financial_performance },
                  { label: `${t('Physical Performance')}`, value: projectPlan.physical_performance }
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
                    <FileDrawer id={projectPlan.id} type={uploadableProjectFileTypes.plan} />
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

export default PlanDetail;
