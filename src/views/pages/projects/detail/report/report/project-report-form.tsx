import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FormikProps } from 'formik';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { ProjectPlan } from 'src/types/project/project-plan';
import { ProjectReport } from 'src/types/project/project-report';
import { formatCurrency } from 'src/utils/formatter/currency';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectReportTableProps {
  formik: FormikProps<ProjectReport>;
  projectPlan: ProjectPlan;
  file: File | null;
  onFileChange: (file: File | null) => void;
  viewSections: {
    manpower: boolean;
    subtotal: boolean;
  };
  toggleSection: (section: 'manpower' | 'subtotal') => void;
}

const calculatePercentage = (reportValue: number | undefined, planValue: number | undefined): string => {
  if (typeof reportValue === 'number' && typeof planValue === 'number') {
    return (((reportValue ?? 0) / (planValue ?? 1)) * 100).toFixed(2) + '%';
  }
  return 'N/A';
};

const ProjectReportTable: React.FC<ProjectReportTableProps> = ({ formik, projectPlan, viewSections, toggleSection }) => {
  const { t: transl } = useTranslation();
  useEffect(() => {
    const indirectLabour = formik.values.indirect_labour ?? 0;
    const directLabour = formik.values.direct_labour ?? 0;
    formik.setFieldValue('manpower', Number(indirectLabour + directLabour));
  }, [formik.values.indirect_labour, formik.values.direct_labour]);

  useEffect(() => {
    const material = formik.values.material ?? 0;
    const machinery = formik.values.machinery ?? 0;
    const otherExpense = formik.values.other_expense ?? 0;
    const subContractorCost = formik.values.sub_contractor_cost ?? 0;
    const manpower = formik.values.manpower ?? 0;
    const subtotal = manpower + material + machinery + otherExpense + subContractorCost;
    formik.setFieldValue('subtotal', subtotal);
  }, [
    formik.values.manpower,
    formik.values.material,
    formik.values.machinery,
    formik.values.other_expense,
    formik.values.sub_contractor_cost
  ]);

  useEffect(() => {
    const overHeadCost = formik.values.over_head_cost ?? 0;
    const financialPerformance = formik.values.financial_performance ?? 0;
    const total = overHeadCost + financialPerformance;
    formik.setFieldValue('total', total);
  }, [formik.values.over_head_cost, formik.values.financial_performance]);
  useEffect(() => {
    const subtotal = formik.values?.subtotal || 0;
    const percentOf = (value: number) => {
      return (value * subtotal) / 100;
    };
    formik.setFieldValue('project_expense', Number(subtotal + percentOf(formik.values.over_head_cost || 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.subtotal, formik.values.over_head_cost]);
  const rows = [
    {
      label: transl('project.report.form.manpower'),
      name: 'manpower',
      section: 'manpower',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.direct-labour'),
      name: 'direct_labour',
      dependsOn: ['manpower', 'subtotal']
    },
    {
      label: transl('project.report.form.indirect-labour'),
      name: 'indirect_labour',
      dependsOn: ['manpower', 'subtotal']
    },
    {
      label: transl('project.report.form.material'),
      name: 'material',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.machinery'),
      name: 'machinery',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.other-expense'),
      name: 'other_expense',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.sub-contractor-cost'),
      name: 'sub_contractor_cost',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.cost-due-to-rework'),
      name: 'cost_due_to_rework',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.financial-performance'),
      name: 'financial_performance',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.physical-performance'),
      name: 'physical_performance',
      dependsOn: ['subtotal']
    },
    {
      label: transl('project.report.form.subtotal'),
      name: 'subtotal',
      section: 'subtotal'
    },
    { label: transl('project.report.form.profit'), name: 'profit' },
    {
      label: transl('project.report.form.over-head-cost'),
      name: 'over_head_cost'
    },
    {
      label: transl('project.report.form.total-cost'),
      name: 'project_expense'
    }
  ];

  const shouldRenderRow = (dependsOn?: string[]) => {
    if (!dependsOn) return true;
    return dependsOn.every((section) => viewSections[section as 'manpower' | 'subtotal']);
  };

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{transl('project.report.form.header')}</TableCell>
            <TableCell>{transl('project.report.form.report')}</TableCell>
            <TableCell>{transl('project.report.form.plan')}</TableCell>
            <TableCell>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const isSection = !!row.section;
            const shouldRender = shouldRenderRow(row.dependsOn);

            return shouldRender ? (
              <TableRow key={index}>
                <TableCell>
                  {isSection && (
                    <IconButton onClick={() => toggleSection(row.section as 'manpower' | 'subtotal')} sx={{ mr: 1 }}>
                      <Icon
                        icon={`tabler:${viewSections[row.section as 'manpower' | 'subtotal'] ? 'chevron-down' : 'chevron-right'}`}
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  )}

                  {row.label}
                </TableCell>
                <TableCell>
                  <CustomTextBox
                    type="number"
                    fullWidth
                    name={row.name}
                    size="small"
                    value={formik.values[row.name as keyof ProjectReport] || ''}
                    onChange={formik.handleChange}
                    disabled={(viewSections.manpower && row.name === 'manpower') || (viewSections.subtotal && row.name === 'subtotal')}
                  />
                </TableCell>
                <TableCell>
                  {projectPlan[row.name as keyof ProjectPlan] != null
                    ? formatCurrency(Number(projectPlan[row.name as keyof ProjectPlan]))?.toString()
                    : '-'}
                </TableCell>
                <TableCell>
                  {calculatePercentage(
                    formik.values[row.name as keyof ProjectReport] as number,
                    projectPlan[row.name as keyof ProjectPlan] as number
                  )}
                </TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
};
export default ProjectReportTable;
