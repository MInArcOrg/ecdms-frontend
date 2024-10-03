import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { uploadFiles, uploadableStakeholderFileTypes } from 'src/services/file/file-service';
import { getWorkExpLevel } from 'src/services/master/workExpLevels';
import { getEmpWorkTotal, postEmpWorkTotal, updateEmpWorkTotal } from 'src/services/stakeholder/employeeWork';
import { setStatusData, setStatusShow } from 'src/store/status';
import { setTaskData, setTaskShow } from 'src/store/task';
import ModStatsTable from 'src/views/components/custom/ModStatsTable';
import MobileView from 'src/views/components/custom/StakeEmpMobileView';
import StakeLayout from 'src/views/components/custom/StakeLayout';
import EmpDataForm from 'src/views/components/forms/stakeholders/EmpDataForm';
import * as uuid from 'uuid';
import subMenuItems from './(subMenuItems)';

function Work() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeid } = router.query;
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [form, setForm] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const { t } = useTranslation();

  //axios calls
  const [{ data: getData }, getEmpExp] = getEmpWorkTotal(id, page || 0, pageSize || 30);
  const [{ loading: postLoading, error: postError }, postEmpWork] = postEmpWorkTotal();
  const [{ loading: putLoading, error: putError }, putEmpWork] = updateEmpWorkTotal();
  const [{ data: levels, loading: levelsLoading }, getLevels] = getWorkExpLevel();
  const { data } = getData || [];

  // functions
  const handleSubmit = async (subData) => {
    const params = {
      stakeholder_id: id,
      year: subData.year,
      domain: subData.domain,
      nationality: subData.nationality
    };

    if (selectedData) {
      const arr = subData.levels.map((item) => {
        return {
          ...params,
          id: item.dataId,
          experiencelevel_id: item.id,
          male: parseInt(item.male),
          female: parseInt(item.female),
          quantity: parseInt(item.male)
        };
      });

      return putEmpWork({
        data: { empWorkArr: arr }
      }).then(async () => {
        const ids = arr
          .map((i) => i.id)
          .sort()
          .join('');

        const id = uuid.v5(ids, uuid.NIL);

        if (subData.referenceFile.length > 0) {
          await Promise.all(
            subData.referenceFile.map(async (file) => await uploadFiles(file, uploadableStakeholderFileTypes.workExperience, id))
          );
        }
        getEmpExp();

        return true;
      });
    }

    const arr = subData.levels.map((item) => {
      return {
        ...params,
        experiencelevel_id: item.id,
        male: parseInt(item.male),
        female: parseInt(item.female),
        quantity: parseInt(item.male)
      };
    });

    return postEmpWork({
      data: { empWorkArr: arr }
    }).then(async (res) => {
      const ids = res?.data?.data
        .map((i) => i.id)
        .sort()
        .join('');
      const id = uuid.v5(ids, uuid.NIL);

      if (subData.referenceFile.length > 0) {
        await Promise.all(
          subData.referenceFile.map(async (file) => await uploadFiles(file, uploadableStakeholderFileTypes.workExperience, id))
        );
      }

      getEmpExp();

      return true;
    });
  };

  const getYears = (array) => {
    const years = array.reduce((acc, item) => {
      if (!acc.includes(item.year)) {
        acc.push(item.year);
      }

      return acc;
    }, []);
    selectedYear == null && setSelectedYear(years[0]);

    return years;
  };

  const handleYear = (year) => {
    setSelectedYear(() => year);
    const filtered = data.filter((item) => item.year === year);
    setFilteredData(filtered);
  };

  const handleStatusSidebar = (data) => {
    setStatusData(data);
    setStatusShow(true);
  };

  const handleTaskSidebar = (data) => {
    setTaskData(data);
    setTaskShow(true);
  };

  useEffect(() => {
    if (data) {
      handleYear(getYears(data)[0]);
    }

    return () => {
      !levelsLoading && getLevels();
      setSelectedYear(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <StakeLayout
      id={id}
      subMenuItems={subMenuItems(id, typeid)}
      toggleIcon="plus"
      activeMenu={1}
      activeSubMenu={3}
      permission={{
        action: 'register_stakeholderemployee',
        subject: 'stakeholderemployee'
      }}
      toggleForm={() => {
        if (!levelsLoading && levels.data.length > 0) {
          setSelectedData(null);
          setForm(!form);
        } else if (!levelsLoading && levels.totalItems === 0) {
          toast.error('Error Years of Work Experience are not Defined please add them first');
        } else toast.loading('Loading Age Groups...');
      }}
    >
      {form && (
        <EmpDataForm
          levels={levels}
          show={form}
          data={selectedData}
          toggleDrawer={() => setForm(!form)}
          loading={postLoading || putLoading}
          error={postError || putError}
          title={
            selectedData
              ? `${t('Edit')} ${t('Employees')} ${t('Work Experience')} ${t('Data')}`
              : `${t('Add')} ${t('Employees')} ${t('Work Experience')} ${t('Data')}`
          }
          subTitle={t('Work Experience')}
          handleFormSubmit={handleSubmit}
        />
      )}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('Employees')} {t('Work Experience')}
          </Typography>
          {!desktop && data && data.length > 0 && (
            <FormControl sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">{t('Year')}</InputLabel>
              <Select
                label="Age"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={getYears(data)[0]}
                value={selectedYear}
                onChange={(e) => handleYear(e.target.value)}
              >
                {getYears(data).map((item) => (
                  <MenuItem key={item} value={item}>
                    {item.substr(0, 4)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {desktop ? (
            <ModStatsTable
              tableData={getData ? getData : { data: [], totalItems: 0 }}
              header="Work Experience"
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              setForm={(editData) => {
                setSelectedData(editData);
                setForm(true);
              }}
              editPemrission={{
                action: 'register_stakeholderemployee',
                subject: 'stakeholderemployee'
              }}
              actionData={{
                model: 'workexperience',
                title: `${t('Employees')} ${t('Work Experience')}`,
                fileType: uploadableStakeholderFileTypes.workExperience
              }}
            />
          ) : (
            <Box marginTop={5}>
              {data &&
                !filteredData &&
                data.map((item) => (
                  <MobileView
                    statusSidebar={handleStatusSidebar}
                    taskSidebar={handleTaskSidebar}
                    item={item}
                    key={item.id}
                    editPemrission={{
                      action: 'register_stakeholderemployee',
                      subject: 'stakeholderemployee'
                    }}
                    actionData={{
                      model: 'workexperience',
                      title: `${t('Employee')} ${t('Work Experience')}`,
                      fileType: uploadableStakeholderFileTypes.workExperience
                    }}
                  />
                ))}
              {filteredData &&
                filteredData.map((item) => (
                  <MobileView
                    statusSidebar={handleStatusSidebar}
                    taskSidebar={handleTaskSidebar}
                    item={item}
                    key={item.id}
                    editPemrission={{
                      action: 'register_stakeholderemployee',
                      subject: 'stakeholderemployee'
                    }}
                    actionData={{
                      model: 'workexperience',
                      title: 'Employee Work Experience',
                      fileType: uploadableStakeholderFileTypes.workExperience
                    }}
                  />
                ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </StakeLayout>
  );
}
Work.acl = {
  action: 'view_stakeholderemployee',
  subject: 'stakeholderemployee'
};

export default Work;
