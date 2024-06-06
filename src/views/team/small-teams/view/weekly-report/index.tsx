import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useWeeklyReport from 'src/hooks/team/weekly-report-hook';
import WeeklyReport from 'src/types/team/weekly-report';

import SmallTeam from 'src/types/team/small-team';
import ItemsListing from 'src/views/shared/listing';
import WeeklyReportDrawer from './add/weekly-report-drawer';
import { weeklyReportColumns } from './weekly-report-row-column';

const WeeklyReportList = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  const [weeklyReportDrawerOpen, setAddWeeklyReportOpen] = useState<boolean>(false);
  const [editableWeeklyReport, setEditableWeeklyReport] = useState<WeeklyReport>();
  const { t: transl } = useTranslation();

  const handleEdit = (weeklyReport: WeeklyReport) => {
    toggleWeeklyReportDrawer();
    setEditableWeeklyReport(weeklyReport);
  };
  // Access the hook methods and state
  const { pagination, allWeeklyReports, isLoading, deleteWeeklyReport, fetchWeeklyReports } = useWeeklyReport() as ReturnType<
    typeof useWeeklyReport
  >;

  const toggleWeeklyReportDrawer = () => {
    setEditableWeeklyReport({} as WeeklyReport);
    setAddWeeklyReportOpen(!weeklyReportDrawerOpen);
  };
  return (
    <>
      {weeklyReportDrawerOpen ? (
        <WeeklyReportDrawer
          smallTeamId={smallTeam.id}
          refetch={() => {}}
          open={weeklyReportDrawerOpen}
          toggle={toggleWeeklyReportDrawer}
          weeklyReport={editableWeeklyReport as WeeklyReport}
          addNewWeeklyReport={function (body: { data: WeeklyReport; files: [] }): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      ) : (
        <ItemsListing
          title="weekly-report"
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          onCreateClick={toggleWeeklyReportDrawer}
          fetchDataFunction={fetchWeeklyReports}
          tableProps={{ headers: weeklyReportColumns(handleEdit, deleteWeeklyReport, transl) }}
          items={allWeeklyReports}
        />
      )}
    </>
  );
};
export default WeeklyReportList;
