import { Box, Card, CardContent, Typography, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MobileView from 'src/views/components/custom/StakeEmpMobileView'
import StakeLayout from 'src/views/components/custom/StakeLayout'
import EmpAgeForm from 'src/views/components/forms/stakeholders/EmpDataForm'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setStatusShow, setStatusData } from 'src/store/status'
import { setTaskShow, setTaskData } from 'src/store/task'
import { getAgeGroups } from 'src/services/master/ageGroups'
import { getEmpAgeTotal, postEmpAgeTotal, updateEmpAge } from 'src/services/stakeholder/epmloyeeAge'
import subMenuItems from './(subMenuItems)))'
import ModStatsTable from 'src/views/components/custom/ModStatsTable'
import { uploadFiles, uploadableStakeholderFileTypes } from 'src/services/file/file-service'
import * as uuid from 'uuid'
import { useTranslation } from 'react-i18next'

function Age() {
  // states / hooks / variables
  const dispatch = useDispatch()
  const router = useRouter()
  const { id, typeid } = router.query
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const [form, setForm] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(30)
  const { t } = useTranslation()

  //axios calls
  const [{ data: getData, loading }, getEmpAges] = getEmpAgeTotal(id, page || 0, pageSize || 30)
  const [{ loading: postLoading, error: postError }, postEmpAges] = postEmpAgeTotal()
  const [{ loading: putLoading, error: putError }, putEmpAges] = updateEmpAge()
  const [{ data: levels, loading: levelsLoading, error }, getLevels] = getAgeGroups()
  const { data } = getData || []

  // functions
  const handleSubmit = async subData => {
    const params = {
      stakeholder_id: id,
      year: subData.year,
      domain: subData.domain,
      nationality: subData.nationality
    }

    if (selectedData) {
      const arr = subData.levels.map(item => {
        return {
          ...params,
          id: item.dataId,
          agelevel_id: item.id,
          male: parseInt(item.male),
          female: parseInt(item.female),
          quantity: parseInt(item.male)
        }
      })

      return putEmpAges({
        data: {
          empAgeArr: arr
        }
      }).then(async () => {
        const ids = arr
          .map(i => i.id)
          .sort()
          .join('')

        const id = uuid.v5(ids, uuid.NIL)

        if (subData.referenceFile.length > 0) {
          await Promise.all(
            subData.referenceFile.map(
              async file => await uploadFiles(file, uploadableStakeholderFileTypes.employeeAge, id)
            )
          )
        }

        getEmpAges()

        return true
      })
    }

    const arr = subData.levels.map(item => {
      return {
        ...params,
        agelevel_id: item.id,
        male: parseInt(item.male),
        female: parseInt(item.female),
        quantity: parseInt(item.male)
      }
    })

    return postEmpAges({ data: { empAgeArr: arr } }).then(async res => {
      const ids = res?.data?.data
        .map(i => i.id)
        .sort()
        .join('')
      const id = uuid.v5(ids, uuid.NIL)

      if (subData.referenceFile.length > 0) {
        await Promise.all(
          subData.referenceFile.map(
            async file => await uploadFiles(file, uploadableStakeholderFileTypes.employeeAge, id)
          )
        )
      }

      getEmpAges()

      return true
    })
  }

  const getYears = array => {
    const years = array.reduce((acc, item) => {
      if (!acc.includes(item.year)) {
        acc.push(item.year)
      }

      return acc
    }, [])
    selectedYear == null && setSelectedYear(years[0])

    return years
  }

  const handleYear = year => {
    setSelectedYear(year)
    const filtered = data.filter(item => item.year === year)
    setFilteredData(filtered)
  }

  const handleStatusSidebar = data => {
    Promise.resolve(dispatch(setStatusData(data))).then(() => {
      dispatch(setStatusShow(true))
    })
  }

  const handleTaskSidebar = data => {
    Promise.resolve(dispatch(setTaskData(data))).then(() => {
      dispatch(setTaskShow(true))
    })
  }

  useEffect(() => {
    if (data) {
      handleYear(getYears(data)[0])
    }

    return () => {
      !levelsLoading && getLevels()
      setSelectedYear(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <StakeLayout
      permission={{
        action: 'register_stakeholderemployee',
        subject: 'stakeholderemployee'
      }}
      id={id}
      subMenuItems={subMenuItems(id, typeid)}
      activeMenu={1}
      toggleIcon='plus'
      activeSubMenu={2}
      toggleForm={() => {
        if (!levelsLoading && levels.data.length > 0) {
          setSelectedData(null)
          setForm(!form)
        } else if (!levelsLoading && levels.data.length === 0) {
          toast.error('Please add Age Groups first')
        } else toast.loading('Loading Age Groups...')
      }}
    >
      {form && (
        <EmpAgeForm
          levels={levels}
          show={form}
          data={selectedData}
          toggleDrawer={() => setForm(!form)}
          loading={postLoading || putLoading}
          error={postError || putError}
          title={
            selectedData ? `${t('Edit')} ${t('Employees')} ${t('Age')}` : `${t('Add')} ${t('Employees')} ${t('Age')}`
          }
          subTitle={t('Age Group')}
          handleFormSubmit={handleSubmit}
        />
      )}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {t('Employees')} {t('Age')}
          </Typography>
          {!desktop && data && data.length > 0 && (
            <FormControl sx={{ my: 2 }}>
              <InputLabel id='demo-simple-select-label'>{t('Year')}</InputLabel>
              <Select
                label='Age'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue={getYears(data)[0]}
                value={selectedYear}
                onChange={e => handleYear(e.target.value)}
              >
                {getYears(data).map(item => (
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
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              setForm={editData => {
                setSelectedData(editData)
                setForm(true)
              }}
              header='Age Group'
              editPemrission={{
                action: 'register_stakeholderemployee',
                subject: 'stakeholderemployee'
              }}
              actionData={{
                model: 'employeeage',
                title: `${t('Employee')} ${t('Age')}`,
                fileType: uploadableStakeholderFileTypes.employeeAge
              }}
            />
          ) : (
            <Box marginTop={5}>
              {!filteredData
                ? data &&
                  data.map(item => (
                    <MobileView
                      statusSidebar={handleStatusSidebar}
                      taskSidebar={handleTaskSidebar}
                      item={item}
                      key={item.id}
                      actionData={{
                        model: 'employeeage',
                        title: `${t('Employee')} ${t('Age')}`,
                        fileType: uploadableStakeholderFileTypes.employeeAge
                      }}
                    />
                  ))
                : filteredData.map(item => (
                    <MobileView
                      statusSidebar={handleStatusSidebar}
                      taskSidebar={handleTaskSidebar}
                      item={item}
                      key={item.id}
                      actionData={{
                        model: 'employeeage',
                        title: `${t('Employee')} ${t('Age')}`,
                        fileType: uploadableStakeholderFileTypes.employeeAge
                      }}
                    />
                  ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </StakeLayout>
  )
}
Age.acl = {
  action: 'view_stakeholderemployee',
  subject: 'stakeholderemployee'
}

export default Age
