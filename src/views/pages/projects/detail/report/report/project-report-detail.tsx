import { Box, CardContent, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectReport } from 'src/types/project/project-report';
import FileDrawer from 'src/views/components/custom/files-drawer';
import { formatCurrency } from 'src/utils/formatter/currency';

interface ReportDetailProps {
  show: boolean;
  toggleDetail: () => void;
  projectReport: ProjectReport;
}

function ReportDetail({ show, toggleDetail, projectReport }: ReportDetailProps) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <CustomSideDrawer
        title={`Q${projectReport.quarter}/${formatDate(projectReport.start, 'yyyy')} ${t('Report')} ${t('Detail')}`}
        handleClose={toggleDetail}
        open={show}
      >
        {() => (
          <Box>
            <CardContent>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{`${t('Detail')} ${t('Report')}`}</strong>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {t('Price')}
                  </Typography>
                </Box>
                <Divider />
                {[
                  { label: t('Manpower'), value: projectReport.manpower },
                  { label: t('Material'), value: projectReport.material },
                  { label: t('Machinery'), value: projectReport.machinery },
                  { label: t('Other Expense'), value: projectReport.other_expense },
                  { label: t('Subcontractor Expense'), value: projectReport.sub_contractor_cost },
                  { label: `${t('Subtotal')}`, value: projectReport.sub_total_expense, bold: true },
                  { label: t('Overhead Cost'), value: projectReport.over_head_cost },
                  { label: t('Profit - loss'), value: projectReport.profit_or_loss },
                  { label: `${t('Project')} ${t('Expense')}`, value: projectReport.project_expense, bold: true },
                  { label: `${t('Financial Performance')}`, value: projectReport.financial_performance },
                  { label: `${t('Physical Performance')}`, value: projectReport.physical_performance }
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
                    <FileDrawer id={projectReport.id} type={uploadableProjectFileTypes.report} />
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

export default ReportDetail;
